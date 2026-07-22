import fs from "fs";
import path from "path";

// Team/leadership headshots are optional. Drop a file into public/team/ named
// after the person (lowercase, hyphenated, matching their name in content.ts)
// and it's picked up automatically — no code changes needed. Until a photo
// exists, callers fall back to the initials avatar / placeholder block.
const SUPPORTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];
const DIACRITICS_PATTERN = new RegExp("[\\u0300-\\u036f]", "g");

function slugify(name: string) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(DIACRITICS_PATTERN, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getPersonPhoto(name: string): string | null {
  const slug = slugify(name);

  for (const ext of SUPPORTED_EXTENSIONS) {
    const filePath = path.join(process.cwd(), "public", "team", `${slug}.${ext}`);
    if (fs.existsSync(filePath)) {
      return `/team/${slug}.${ext}`;
    }
  }

  return null;
}
