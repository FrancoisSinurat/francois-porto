export type GithubActivity = {
  username: string;
  profileUrl: string;
  projects: number;
  commits: number;
  pushes: number;
  /** ISO date (YYYY-MM-DD) → contribution count */
  calendar: Record<string, number>;
  lastUpdated: string;
};

type GithubUser = {
  login: string;
  public_repos: number;
  html_url: string;
};

type GithubPushEvent = {
  type: string;
  created_at: string;
  payload?: {
    size?: number;
    distinct_size?: number;
  };
};

type GraphqlCalendarResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number;
          weeks: {
            contributionDays: { date: string; contributionCount: number }[];
          }[];
        };
      };
      repositories?: { totalCount: number };
    };
  };
  errors?: { message: string }[];
};

const env = {
  token: process.env.GITHUB_TOKEN,
  username: process.env.GITHUB_USERNAME || "FrancoisSinurat",
};

const GITHUB_API = "https://api.github.com";
const GITHUB_GQL = "https://api.github.com/graphql";

type NextFetchInit = RequestInit & { next?: { revalidate: number } };

function headers(): HeadersInit {
  const h: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "francois-porto",
  };
  if (env.token) h.Authorization = `Bearer ${env.token}`;
  return h;
}

async function githubFetch<T>(path: string): Promise<{ data: T; response: Response }> {
  const url = path.startsWith("http") ? path : `${GITHUB_API}${path}`;
  const response = await fetch(url, {
    headers: headers(),
    next: { revalidate: 3600 },
  } as NextFetchInit);
  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`GitHub ${response.status}: ${body.slice(0, 200) || response.statusText}`);
  }
  return { data: (await response.json()) as T, response };
}

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

async function fetchUser(username: string): Promise<GithubUser> {
  const { data } = await githubFetch<GithubUser>(`/users/${encodeURIComponent(username)}`);
  return data;
}

/** Authenticated: all repos. Public: public_repos from profile. */
async function countRepos(username: string, publicRepos: number): Promise<number> {
  if (!env.token) return publicRepos;

  try {
    // Token owner affiliation count (includes private)
    const { response } = await githubFetch<unknown[]>(
      `/user/repos?per_page=1&affiliation=owner,collaborator,organization_member`
    );
    const link = response.headers.get("link");
    if (link) {
      const last = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
      if (last?.[1]) return Number(last[1]);
    }
    // Fall through — paginate lightly
    let page = 1;
    let count = 0;
    while (page <= 20) {
      const { data } = await githubFetch<unknown[]>(
        `/user/repos?per_page=100&page=${page}&affiliation=owner,collaborator,organization_member`
      );
      count += data.length;
      if (data.length < 100) break;
      page += 1;
    }
    return count || publicRepos;
  } catch {
    return publicRepos;
  }
}

async function fetchContributionCalendar(username: string): Promise<{
  calendar: Record<string, number>;
  totalContributions: number;
} | null> {
  if (!env.token) return null;

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(GITHUB_GQL, {
    method: "POST",
    headers: {
      ...headers(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { login: username } }),
    next: { revalidate: 3600 },
  } as NextFetchInit);

  if (!response.ok) return null;

  const json = (await response.json()) as GraphqlCalendarResponse;
  if (json.errors?.length || !json.data?.user?.contributionsCollection) return null;

  const cal = json.data.user.contributionsCollection.contributionCalendar;
  if (!cal) return null;

  const calendar: Record<string, number> = {};
  for (const week of cal.weeks) {
    for (const day of week.contributionDays) {
      if (day.contributionCount > 0) calendar[day.date] = day.contributionCount;
    }
  }

  return { calendar, totalContributions: cal.totalContributions };
}

/** Public events fallback (≈90 days / max ~300 events). */
async function summarizePublicPushes(username: string): Promise<{
  pushes: number;
  commits: number;
  calendar: Record<string, number>;
}> {
  let page = 1;
  let pushes = 0;
  let commits = 0;
  const calendar: Record<string, number> = {};
  const maxPages = 3; // GitHub caps public events

  while (page <= maxPages) {
    const { data } = await githubFetch<GithubPushEvent[]>(
      `/users/${encodeURIComponent(username)}/events/public?per_page=100&page=${page}`
    );
    if (!data.length) break;

    for (const event of data) {
      if (event.type !== "PushEvent") continue;
      pushes += 1;
      const n = event.payload?.distinct_size ?? event.payload?.size ?? 1;
      commits += n;
      const key = dayKey(event.created_at);
      calendar[key] = (calendar[key] ?? 0) + Math.min(n, 40);
    }
    if (data.length < 100) break;
    page += 1;
  }

  return { pushes, commits, calendar };
}

export async function getGithubActivity(): Promise<GithubActivity> {
  const username = env.username;
  const user = await fetchUser(username);

  const [projects, gqlCal, pushStats] = await Promise.all([
    countRepos(username, user.public_repos),
    fetchContributionCalendar(username),
    summarizePublicPushes(username),
  ]);

  const calendar = gqlCal?.calendar ?? pushStats.calendar;
  let commits = gqlCal?.totalContributions ?? pushStats.commits;
  let pushes = pushStats.pushes;

  // If GraphQL calendar exists but public events are empty, estimate pushes from active days
  if (pushes === 0 && Object.keys(calendar).length > 0) {
    pushes = Object.keys(calendar).length;
  }

  if (commits === 0) {
    commits = Object.values(calendar).reduce((a, b) => a + b, 0);
  }

  return {
    username: user.login,
    profileUrl: user.html_url,
    projects,
    commits,
    pushes,
    calendar,
    lastUpdated: new Date().toISOString(),
  };
}
