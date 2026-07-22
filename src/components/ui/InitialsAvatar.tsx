function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function InitialsAvatar({
  name,
  size = "h-20 w-20",
}: {
  name: string;
  size?: string;
}) {
  return (
    <div
      aria-hidden
      className={`flex ${size} shrink-0 items-center justify-center rounded-full border border-border bg-cream font-serif text-lg font-semibold text-navy`}
    >
      {getInitials(name)}
    </div>
  );
}
