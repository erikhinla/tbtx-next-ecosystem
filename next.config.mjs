/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/scan", destination: "/tbtx/scan", permanent: false },
      { source: "/map", destination: "/tbtx/map", permanent: false },
      { source: "/diagnostic", destination: "/tbtx/map", permanent: false },
      { source: "/tbtx/diagnostic", destination: "/tbtx/map", permanent: false },
      { source: "/tbtx/hub", destination: "/tbtx", permanent: false },
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
