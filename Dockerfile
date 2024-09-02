# Sử dụng hình ảnh Node.js chính thức
FROM node:18

# Tạo thư mục ứng dụng
WORKDIR /app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các phụ thuộc
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Xây dựng ứng dụng Next.js
RUN npm run build

# Mở cổng 3000 để container có thể lắng nghe
EXPOSE 3000

# Chạy ứng dụng
CMD ["npm", "start"]
