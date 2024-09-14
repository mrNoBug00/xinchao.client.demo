require("dotenv").config({
  path: `.env.local`,
});

const nextConfig = {
  images: {
    domains: ["xcserver.site", "localhost"],
  },
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // Các biến môi trường khác nếu cần
  },
};

module.exports = nextConfig;
