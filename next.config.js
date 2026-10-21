/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/project",
        destination: "/project.jsx",
      },
      {
        source: "/projects",
        destination: "/project.jsx",
      },
      {
        source: "/project/sales-inventory-dashboard",
        destination: "/projects/sales-inventory-dashboard",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:file*.xlsx",
        headers: [
          {
            key: "Content-Disposition",
            value: "attachment",
          },
          {
            key: "Content-Type",
            value: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

