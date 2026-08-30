/** Local /media in dev. Production films live on Vercel Blob, not git or GitHub Releases. */
const BLOB =
  "https://9s35ujeqbjjbd1bt.public.blob.vercel-storage.com/media";

export function film(path: string) {
  const file = path.replace(/^\/media\//, "").replace(/^\//, "");
  if (process.env.NODE_ENV !== "production") {
    return path.startsWith("/") ? path : `/media/${path}`;
  }
  const origin = (process.env.NEXT_PUBLIC_MEDIA_ORIGIN || BLOB).replace(/\/$/, "");
  return `${origin}/${file}`;
}
