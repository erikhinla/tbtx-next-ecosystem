/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      { source: "/diagnostic", destination: "/tbtx/map", permanent: false },
      { source: "/tbtx/diagnostic", destination: "/tbtx/map", permanent: false },
      { source: "/tbtx/hub", destination: "/tbtx", permanent: false },
      { source: "/diagnostic/blueprint", destination: "/tbtx/blueprint", permanent: false },
      { source: "/bbai/roadmap", destination: "/tbtx/map", permanent: false },
      { source: "/bbai/flow-agent-as", destination: "/bbai", permanent: false },
      { source: "/bbai/context-architecture", destination: "/bbai", permanent: false },
      { source: "/scrollcraft-demo", destination: "/tbtx", permanent: false },
      { source: "/scrollcraft-demo/:path*", destination: "/tbtx", permanent: false },
    ];
  },
};

export default nextConfig;
