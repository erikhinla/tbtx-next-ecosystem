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
      { source: "/assets/:path*", destination: "/review/proof-momentum/assets/:path*" },
    ];
  },
  async redirects() {
    return [
      { source: "/scan", destination: "/tbtx/scan", permanent: false },
      { source: "/map", destination: "/tbtx/map", permanent: false },
      { source: "/diagnostic", destination: "/tbtx/map", permanent: false },
      { source: "/tbtx/diagnostic", destination: "/tbtx/map", permanent: false },
      { source: "/diagnostic/blueprint", destination: "/tbtx/blueprint", permanent: false },
      { source: "/bbai/roadmap", destination: "/tbtx/map", permanent: false },
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
