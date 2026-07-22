export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`font-sans text-xs font-semibold uppercase tracking-[0.14em] text-gold ${className}`}
    >
      {children}
    </p>
  );
}
