require("dotenv").config({
  path: `.env.local`,
});

const nextConfig = {
  images: {
    domains: ["13.213.33.4"],
  },
  env: {
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    // Các biến môi trường khác nếu cần
  },
};

module.exports = nextConfig;
