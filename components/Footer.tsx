export default function Footer() {
  return (
    <footer className="py-6 border-t border-[hsl(var(--surface-border)/0.5)] page-surface">
      <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[hsl(var(--muted-foreground))]">
        <p>&copy; 2025 Francois Novalentino Sinurat. All Rights Reserved.</p>
        <p className="text-xs">Bekasi City, Indonesia</p>
      </div>
    </footer>
  );
}
