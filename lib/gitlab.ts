export type GitlabActivity = {
  username: string;
  profileUrl: string;
  projects: number;
  commits: number;
  pushes: number;
  /** ISO date (YYYY-MM-DD) → contribution count */
  calendar: Record<string, number>;
  lastUpdated: string;
};

type GitlabUser = {
  id: number;
  username: string;
};

type GitlabEvent = {
  action_name: string;
  created_at: string;
  push_data?: {
    commit_count?: number;
  } | null;
};

const env = {
  baseUrl: process.env.GITLAB_BASE_URL,
  token: process.env.GITLAB_TOKEN,
  username: process.env.GITLAB_USERNAME,
};

const GITLAB_API = env.baseUrl?.replace(/\/$/, "") || "https://gitlab.com";
const DEFAULT_USERNAME = "novalsinurat28";

type NextFetchInit = RequestInit & { next?: { revalidate: number } };

function headers(): HeadersInit {
  const h: HeadersInit = { Accept: "application/json" };
  if (env.token) h["PRIVATE-TOKEN"] = env.token;
  return h;
}

async function gitlabFetch<T>(
  path: string,
  init?: NextFetchInit
): Promise<{ data: T; response: Response }> {
  const url = path.startsWith("http") ? path : `${GITLAB_API}/api/v4${path}`;
  const response = await fetch(url, {
    ...init,
    headers: { ...headers(), ...init?.headers },
    next: { revalidate: 3600 },
  } as NextFetchInit);
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`GitLab ${response.status}: ${body.slice(0, 200) || response.statusText}`);
  }
  const data = (await response.json()) as T;
  return { data, response };
}

/**
 * Resolve the token owner via GET /user (fine-grained friendly).
 * Avoid GET /users?username=… — that needs instance "User: Read" and often 403s on gPAT.
 */
async function resolveCurrentUser(): Promise<GitlabUser> {
  if (!env.token) {
    throw new Error(
      "GITLAB_TOKEN is missing. Add a fine-grained PAT to .env.local and restart the server."
    );
  }

  const { data } = await gitlabFetch<GitlabUser>("/user");
  if (!data?.username) throw new Error("GitLab /user returned an empty profile");
  return data;
}

async function countFromHeaderOrPages(
  firstPath: string,
  pagePath: (page: number) => string
): Promise<number> {
  const { data, response } = await gitlabFetch<unknown[]>(firstPath);
  const total = response.headers.get("x-total");
  if (total) return Number(total);

  let count = data.length;
  let page = 2;
  while (page <= 20) {
    const { data: pageData } = await gitlabFetch<unknown[]>(pagePath(page));
    count += pageData.length;
    if (pageData.length < 100) break;
    page += 1;
  }
  return count;
}

async function countProjects(): Promise<number> {
  return countFromHeaderOrPages(
    `/projects?membership=true&simple=true&per_page=1`,
    (page) => `/projects?membership=true&simple=true&per_page=100&page=${page}`
  );
}

async function fetchCalendarJson(username: string): Promise<Record<string, number>> {
  // Public calendar endpoint — no User API scope needed
  const url = `${GITLAB_API}/users/${encodeURIComponent(username)}/calendar.json`;
  const response = await fetch(url, {
    next: { revalidate: 3600 },
  } as NextFetchInit);
  if (!response.ok) return {};
  const data = (await response.json()) as Record<string, number>;
  return data && typeof data === "object" ? data : {};
}

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

/** Current-user push events (GET /events) — avoids /users/:id/events. */
async function summarizePushes(): Promise<{
  pushes: number;
  commits: number;
  calendar: Record<string, number>;
}> {
  const after = new Date();
  after.setFullYear(after.getFullYear() - 1);
  const afterIso = after.toISOString();

  let page = 1;
  let pushes = 0;
  let commits = 0;
  const calendar: Record<string, number> = {};
  const maxPages = 20;

  while (page <= maxPages) {
    const { data } = await gitlabFetch<GitlabEvent[]>(
      `/events?action=pushed&per_page=100&page=${page}&after=${encodeURIComponent(afterIso)}`
    );
    if (!data.length) break;

    for (const event of data) {
      pushes += 1;
      const n = event.push_data?.commit_count ?? 1;
      commits += n;
      const key = dayKey(event.created_at);
      // Cap per-push so bulk imports don't wash out the heatmap
      calendar[key] = (calendar[key] ?? 0) + Math.min(n, 40);
    }
    if (data.length < 100) break;
    page += 1;
  }

  return { pushes, commits, calendar };
}

function mergeCalendars(
  primary: Record<string, number>,
  fallback: Record<string, number>
): Record<string, number> {
  const primaryTotal = Object.values(primary).reduce((a, b) => a + b, 0);
  if (primaryTotal > 0) return primary;
  return fallback;
}

export async function getGitlabActivity(): Promise<GitlabActivity> {
  const user = await resolveCurrentUser();
  const username = user.username || env.username || DEFAULT_USERNAME;

  const [projects, publicCalendar, pushStats] = await Promise.all([
    countProjects(),
    fetchCalendarJson(username),
    summarizePushes(),
  ]);

  const calendar = mergeCalendars(publicCalendar, pushStats.calendar);

  const { pushes } = pushStats;
  let { commits } = pushStats;
  if (commits === 0 && pushes === 0) {
    commits = Object.values(calendar).reduce((a, b) => a + b, 0);
  }

  return {
    username,
    profileUrl: `${GITLAB_API}/${username}`,
    projects,
    commits,
    pushes,
    calendar,
    lastUpdated: new Date().toISOString(),
  };
}
