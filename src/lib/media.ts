/** Local /media in dev. Production films live on the GitHub release so Vercel is not asked to swallow 200MB+ uploads. */
const RELEASE =
  "https://github.com/erikhinla/tbtx-next-ecosystem/releases/download/media-v1";

export function film(path: string) {
  const file = path.replace(/^\/media\//, "");
  if (process.env.NODE_ENV !== "production") return path.startsWith("/") ? path : `/media/${path}`;
  const origin = process.env.NEXT_PUBLIC_MEDIA_ORIGIN || RELEASE;
  return `${origin.replace(/\/$/, "")}/${file}`;
}
