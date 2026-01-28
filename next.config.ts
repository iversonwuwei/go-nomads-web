import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  experimental: {
    optimizeCss: {
      // Allow CSS Houdini @property in DaisyUI radialprogress
      lightningcss: {
        drafts: { customProperties: true },
      },
    },
  },
};

export default nextConfig;
