import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            new URL('https://avatar.vercel.sh/**'),
            {
                protocol: 'https',
                hostname: 'icons.duckduckgo.com',
                port: '',
                pathname: '/ip3/**',
                search: '',
            }
        ],
    },
};

export default nextConfig;
