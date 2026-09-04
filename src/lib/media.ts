/** Local /media in dev. Production films live on Vercel Blob, not git or GitHub Releases. */
const BLOB =
  "https://9s35ujeqbjjbd1bt.public.blob.vercel-storage.com/media";

/** Ship with the app until Blob has the object. Remove after the upload in MEDIA.md. */
const LOCAL_FILMS = new Set(["defog-daily-hero.mp4"]);

export function film(path: string) {
  const file = path.replace(/^\/media\//, "").replace(/^\//, "");
  if (process.env.NODE_ENV !== "production" || LOCAL_FILMS.has(file)) {
    return path.startsWith("/") ? path : `/media/${path}`;
  }
  const origin = (process.env.NEXT_PUBLIC_MEDIA_ORIGIN || BLOB).replace(/\/$/, "");
  return `${origin}/${file}`;
}
