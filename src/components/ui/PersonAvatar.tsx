import Image from "next/image";
import { getPersonPhoto } from "@/lib/team-photos";
import { InitialsAvatar } from "@/components/ui/InitialsAvatar";

export function PersonAvatar({
  name,
  size = "h-20 w-20",
  sizePx = 80,
}: {
  name: string;
  size?: string;
  sizePx?: number;
}) {
  const photo = getPersonPhoto(name);

  if (!photo) {
    return <InitialsAvatar name={name} size={size} />;
  }

  return (
    <Image
      src={photo}
      alt={name}
      width={sizePx}
      height={sizePx}
      className={`${size} shrink-0 rounded-full border border-border object-cover`}
    />
  );
}
