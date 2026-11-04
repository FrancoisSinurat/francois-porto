/** Tech stack with first-use year — years display is computed at render time. */

export type SkillDef = {
  name: string;
  /** Calendar year you started using it seriously */
  since: number;
  iconKey:
    | "golang"
    | "nodejs"
    | "javascript"
    | "php"
    | "python"
    | "nextjs"
    | "react"
    | "laravel"
    | "fastapi"
    | "tailwind"
    | "postgresql"
    | "mysql"
    | "redis"
    | "rabbitmq"
    | "gcp";
};

export const skills: SkillDef[] = [
  { name: "Golang", since: 2025, iconKey: "golang" },
  { name: "Node.js", since: 2024, iconKey: "nodejs" },
  { name: "JavaScript", since: 2023, iconKey: "javascript" },
  { name: "PHP", since: 2023, iconKey: "php" },
  { name: "Python", since: 2024, iconKey: "python" },
  { name: "Next.js", since: 2024, iconKey: "nextjs" },
  { name: "React", since: 2024, iconKey: "react" },
  { name: "Laravel", since: 2024, iconKey: "laravel" },
  { name: "FastAPI", since: 2024, iconKey: "fastapi" },
  { name: "Tailwind", since: 2024, iconKey: "tailwind" },
  { name: "PostgreSQL", since: 2025, iconKey: "postgresql" },
  { name: "MySQL", since: 2023, iconKey: "mysql" },
  { name: "Redis", since: 2025, iconKey: "redis" },
  { name: "RabbitMQ", since: 2025, iconKey: "rabbitmq" },
  { name: "GCP", since: 2024, iconKey: "gcp" },
];

/** e.g. "3 yrs", "1 yr", "<1 yr" */
export function skillYearsLabel(since: number, now = new Date()): string {
  const years = Math.max(0, now.getFullYear() - since);
  if (years < 1) return "<1 yr";
  if (years === 1) return "1 yr";
  return `${years} yrs`;
}
