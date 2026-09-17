/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
      { source: "/scrollcraft.css", destination: "/review/proof-momentum/scrollcraft.css" },
      { source: "/experience.css", destination: "/review/proof-momentum/experience.css" },
      { source: "/arrows.css", destination: "/review/proof-momentum/arrows.css" },
      { source: "/media.js", destination: "/review/proof-momentum/media.js" },
      { source: "/scrollcraft.js", destination: "/review/proof-momentum/scrollcraft.js" },
      { source: "/questions.js", destination: "/review/proof-momentum/questions.js" },
      { source: "/question-notes.js", destination: "/review/proof-momentum/question-notes.js" },
      { source: "/experience.js", destination: "/review/proof-momentum/experience.js" },
      { source: "/method.js", destination: "/review/proof-momentum/method.js" },
      { source: "/ddd.js", destination: "/review/proof-momentum/ddd.js" },
      { source: "/story.js", destination: "/review/proof-momentum/story.js" },
      { source: "/story.css", destination: "/review/proof-momentum/story.css" },
      { source: "/benefit-track.css", destination: "/review/proof-momentum/benefit-track.css" },
      { source: "/benefit-track.js", destination: "/review/proof-momentum/benefit-track.js" },
      { source: "/benefit-track.json", destination: "/review/proof-momentum/benefit-track.json" },
      { source: "/hang.html", destination: "/review/proof-momentum/hang.html" },
      { source: "/hang", destination: "/review/proof-momentum/hang.html" },
      { source: "/hang/:slug", destination: "/review/proof-momentum/story.html" },
      { source: "/hang/assets/:path*", destination: "/review/proof-momentum/assets/:path*" },
      { source: "/assets/:path*", destination: "/review/proof-momentum/assets/:path*" },
    ];
  },
  async headers() {
    return [
      {
        source: "/review/proof-momentum/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:file(media.js|scrollcraft.js|experience.js|method.js|ddd.js|questions.js|question-notes.js|benefit-track.js|story.js|scrollcraft.css|experience.css|arrows.css|benefit-track.css|story.css)",
        headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    return [
      { source: "/tbtx/scan", destination: "/scan", permanent: false },
      { source: "/tbtx/map", destination: "/map", permanent: false },
      { source: "/diagnostic", destination: "/map", permanent: false },
      { source: "/tbtx/diagnostic", destination: "/map", permanent: false },
      { source: "/diagnostic/blueprint", destination: "/bbai", permanent: false },
      { source: "/bbai/roadmap", destination: "/map", permanent: false },
      { source: "/bbai/flow-agent-as", destination: "/bbai", permanent: false },
      { source: "/bbai/context-architecture", destination: "/bbai", permanent: false },
      { source: "/scrollcraft-demo", destination: "/tbtx", permanent: false },
      { source: "/scrollcraft-demo/:path*", destination: "/tbtx", permanent: false },
      { source: "/fog-free-daily", destination: "/tbtx/kit", permanent: false },
      {
        source: "/fog-free-daily/share-video",
        destination: "/tbtx/kit/share",
        permanent: false,
      },
      { source: "/foglift-kit", destination: "/tbtx/kit", permanent: false },
      { source: "/fog-lift-kit", destination: "/tbtx/kit", permanent: false },
      {
        source: "/downloads/Fog-Lift-Kit.pdf",
        destination: "/downloads/Fog-Free-Daily.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
