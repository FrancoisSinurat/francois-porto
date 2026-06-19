type SectionHeaderProps = {
  label: string;
  title: string;
  description?: string;
  variant?: "light" | "dark";
};

export default function SectionHeader({
  label,
  title,
  description,
  variant = "light",
}: SectionHeaderProps) {
  const isDark = variant === "dark";

  return (
    <div className="lg:sticky lg:top-[calc(var(--nav-height)+1.25rem)] lg:self-start">
      <div className="accent-line mb-5" />
      <p
        className={`text-xs font-bold uppercase tracking-[0.2em] mb-2 ${
          isDark ? "text-[hsl(var(--accent-soft))]" : "text-[hsl(var(--accent))]"
        }`}
      >
        {label}
      </p>
      <h2
        className={`text-2xl sm:text-3xl font-bold tracking-tight leading-tight ${
          isDark ? "text-[hsl(var(--surface))]" : "text-[hsl(var(--foreground))]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-base leading-relaxed ${
            isDark ? "text-[hsl(var(--surface-border))]" : "text-[hsl(var(--muted-foreground))]"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
