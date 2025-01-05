/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos', // Replace with your domain
          pathname: '/**',          // Allow all paths
        },
        {
          protocol: 'https',
          hostname: 'example.com',   // Another domain if needed
          pathname: '/**',          // Allow all paths
        },
      ],
    },
  };
  
  export default nextConfig;
  