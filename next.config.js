require("dotenv").config({
  path: `.env.local`,
});

const withNextIntl = require("next-intl/plugin")();

const nextConfig = {
  images: {
    domains: ["www.thuenhadep.online", "www.xcserver.site", "localhost"], // Thêm hostname vào đây
  },
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    // Các biến môi trường khác nếu cần
  },
};

// Xuất cấu hình
module.exports = withNextIntl({ ...nextConfig });
