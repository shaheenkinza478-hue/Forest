/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,   // آپ کی پہلے سے موجود سیٹنگ
  images: {
    unoptimized: true,   // عارضی حل – تمام تصاویر بغیر چیک لوڈ ہوں گی
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'source.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

export default nextConfig;