import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';

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
  },
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx']
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm]
  }
});

export default withMDX(nextConfig);
