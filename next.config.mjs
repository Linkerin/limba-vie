/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'epzcxetjipqthrjrvzcu.supabase.co',
        port: '',
        pathname: '/storage/v1/**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com/dgqxrmnjx',
        port: '',
        pathname: '/image/**'
      }
    ]
  }
};

export default nextConfig;
