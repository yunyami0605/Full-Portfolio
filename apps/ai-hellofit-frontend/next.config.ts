import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */

  sassOptions: {
    includePaths: [path.join(__dirname, "../../packages/ui/styles")],
  },
  transpilePackages: ["@my/ui", "@my/hooks"],
};

export default nextConfig;
