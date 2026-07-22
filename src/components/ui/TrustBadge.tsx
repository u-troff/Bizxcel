export function TrustBadge({
  children,
  variant = "solid",
}: {
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  const styles =
    variant === "outline"
      ? "border border-border bg-transparent text-body"
      : "border border-border bg-white text-ink";

  return (
    <span className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium ${styles}`}>
      {children}
    </span>
  );
}
