/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  images: {
    qualities: [75, 85],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;
