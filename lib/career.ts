/** Structured career data — dates drive years, sorting, and "Present" labels. */

export type ExperienceItem = {
  title: string;
  company: string;
  client?: string;
  /** ISO month: YYYY-MM */
  start: string;
  /** ISO month or null = ongoing / Present */
  end: string | null;
  type: string;
  highlights: string[];
};

export const experiences: ExperienceItem[] = [
  {
    title: "Back End Developer",
    company: "Neekosa Pakar Service",
    client: "PT Pegadaian",
    start: "2026-07",
    end: null,
    type: "Full-time · Client placement · On-site",
    highlights: [
      "Develop Golang microservices for Pegadaian's Rahn (Islamic gold pawn) product — loan submission, approval workflow, and facilities calculation.",
      "Build TEFS (physical gold deposit) ↔ Rahn conversion flows across services, including status sync and final convert that closes Titipan when Rahn activates.",
      "Implement multi-stage workflow orchestration: submission, verification/approval, confirmation, disbursement, and collateral check-in.",
      "Integrate service-to-service APIs (TEFS, workflow-rahn, loan-rahn, facilities-rahn) with clear OpenAPI/Swagger contracts.",
      "Create Kafka Control Center connectors to consume and sync data from DB2 to PostgreSQL via API.",
      "Ship and harden production features on Pegadaian's SPRINT platform with API testing and UAT support.",
    ],
  },
  {
    title: "Back End Developer",
    company: "PT Teknologi Operator Prima",
    start: "2025-08",
    end: "2026-07",
    type: "Full-time · On-site · Tangerang Regency",
    highlights: [
      "Developed Mobile Banking backend services using Golang, handling core business logic and high-performance APIs.",
      "Built Gateway Service in Golang for payment gateway, third-party, and internal microservice integrations.",
      "Optimized MySQL queries (stored procedures, functions) and improved performance via indexing & query tuning.",
      "Integrated external systems via SFTP and managed transactional data with PostgreSQL.",
      "Implemented Redis caching and RabbitMQ messaging to improve performance and scalability.",
      "Maintained Digital Banking applications using Delphi and developed ERP modules with PHP (Slim) + MongoDB.",
    ],
  },
  {
    title: "Full Stack Development Internship",
    company: "Dinas Cipta Karya, Tata Ruang dan Pertanahan Provinsi DKI Jakarta",
    start: "2024-06",
    end: "2024-08",
    type: "Internship · On-site · Jakarta",
    highlights: [
      "Implemented Asset Group features with Laravel for efficient asset categorization and management.",
      "Integrated AssetGroup Model with Eloquent ORM for structured data storage.",
      "Applied Laravel MVC architecture to improve modularity and maintainability.",
    ],
  },
  {
    title: "Cloud Computing — Bangkit Academy",
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, and Traveloka",
    start: "2024-02",
    end: "2024-07",
    type: "Technical Program · Remote",
    highlights: [
      "Learned and applied Google Cloud Platform for cloud-based project development.",
      "Collaborated on a capstone using Next.js, Node.js, and Cloud SQL.",
      "Deployed the application on Google Cloud Run for scalable delivery.",
    ],
  },
];

const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function parseMonth(iso: string): Date {
  const [y, m] = iso.split("-").map(Number);
  return new Date(y, (m || 1) - 1, 1);
}

function formatMonthLabel(iso: string): string {
  const d = parseMonth(iso);
  return `${MONTH_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

/** Inclusive month span between two month starts (end exclusive → +1 for inclusive). */
export function monthsBetween(startIso: string, endIso: string | null, now = new Date()): number {
  const start = parseMonth(startIso);
  const end = endIso
    ? parseMonth(endIso)
    : new Date(now.getFullYear(), now.getMonth(), 1);
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;
  return Math.max(months, 1);
}

export function formatDuration(months: number): string {
  if (months < 12) return `${months} mo${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  if (rem === 0) return `${years} yr${years === 1 ? "" : "s"}`;
  return `${years} yr${years === 1 ? "" : "s"} ${rem} mo${rem === 1 ? "" : "s"}`;
}

export function formatPeriod(start: string, end: string | null): string {
  const from = formatMonthLabel(start);
  if (!end) return `${from} — Present`;
  const to = formatMonthLabel(end);
  if (from === to) return from;
  return `${from} — ${to}`;
}

export function isOngoing(end: string | null): boolean {
  return end === null;
}

/** Newest first; ongoing roles float to the top. */
export function sortExperiences(items: ExperienceItem[]): ExperienceItem[] {
  return [...items].sort((a, b) => {
    const aOngoing = isOngoing(a.end) ? 1 : 0;
    const bOngoing = isOngoing(b.end) ? 1 : 0;
    if (aOngoing !== bOngoing) return bOngoing - aOngoing;
    const aKey = a.end ?? a.start;
    const bKey = b.end ?? b.start;
    return bKey.localeCompare(aKey) || b.start.localeCompare(a.start);
  });
}

/** Career start = earliest experience start. */
export function careerStartIso(items: ExperienceItem[] = experiences): string {
  return items.reduce((min, e) => (e.start < min ? e.start : min), items[0]?.start ?? "2024-02");
}

/**
 * Simple professional label for hero, e.g. "2+" or "1".
 * Uses floor years; "+" when there are leftover months (or still under 1 full year → "1").
 */
export function yearsExperienceLabel(
  items: ExperienceItem[] = experiences,
  now = new Date()
): { value: string; suffix: string; months: number } {
  const start = careerStartIso(items);
  const months = monthsBetween(start, null, now);
  const years = Math.floor(months / 12);
  if (years < 1) {
    return { value: "1", suffix: "Year Experience", months };
  }
  if (months % 12 === 0) {
    return {
      value: String(years),
      suffix: years === 1 ? "Year Experience" : "Years Experience",
      months,
    };
  }
  return {
    value: `${years}+`,
    suffix: "Years Experience",
    months,
  };
}

export function getSortedExperiences(): (ExperienceItem & {
  periodLabel: string;
  durationLabel: string;
  ongoing: boolean;
})[] {
  return sortExperiences(experiences).map((e) => {
    const months = monthsBetween(e.start, e.end);
    return {
      ...e,
      periodLabel: formatPeriod(e.start, e.end),
      durationLabel: formatDuration(months),
      ongoing: isOngoing(e.end),
    };
  });
}
