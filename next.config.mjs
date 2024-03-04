/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => {
    return [{ source: "/boards", destination: "/", permanent: true }];
  },
};

export default nextConfig;
