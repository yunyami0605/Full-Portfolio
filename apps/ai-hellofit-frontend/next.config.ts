import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */

  sassOptions: {
    includePaths: [path.join(__dirname, "../../packages/ui/styles")],
  },
  transpilePackages: ["@my/ui", "@my/hooks"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hellofit-bucket.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
