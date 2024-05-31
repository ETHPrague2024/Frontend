/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    remotePatterns: [
      // For dev only
      ...(process.env.NODE_ENV !== "production"
        ? [
            {
              protocol: "https",
              hostname: "placehold.jp",
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "ipfs.io",
      },
    ],
  },
};

module.exports = nextConfig;
