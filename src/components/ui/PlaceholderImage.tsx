export function PlaceholderImage({
  caption,
  className = "aspect-[4/5]",
  rounded = "rounded-[10px]",
}: {
  caption: string;
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${rounded} ${className} border border-border bg-[linear-gradient(135deg,var(--cream)_0%,#e4e9ee_55%,var(--navy)_100%)]`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
      <p className="relative max-w-[70%] text-center font-sans text-xs font-medium uppercase tracking-[0.08em] text-navy/70">
        {caption}
      </p>
    </div>
  );
}
