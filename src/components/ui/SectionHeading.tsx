import { Eyebrow } from "./Eyebrow";

type Heading = "h1" | "h2";

export function SectionHeading({
  eyebrow,
  title,
  as = "h2",
  onNavy = false,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: string;
  as?: Heading;
  onNavy?: boolean;
  align?: "left" | "center";
  className?: string;
}) {
  const Tag = as;
  return (
    <div className={`${align === "center" ? "text-center" : ""} ${className}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Tag
        className={`mt-3 text-[2rem] leading-[1.15] font-semibold md:text-[2.25rem] ${
          onNavy ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </Tag>
    </div>
  );
}
