import { IMG_URL } from "@/service/api";
import React from "react";
import styles from "../styles/ProductCard.module.css"; // Import CSS module
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { imageUrl: string }[]; // Mảng hình ảnh
  address: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  images,
  address,
}) => {
  const router = useRouter();
  const handleDetail = () => {
    router.push(`/pages/product/${id}`);
  };

  // Kiểm tra nếu images có dữ liệu và có ít nhất một hình ảnh
  const imageUrl =
    images.length > 0
      ? `${IMG_URL}/${images[0].imageUrl}`
      : "/default-image.png"; // Cách lấy imageUrl từ mảng images


  return (
    <div className={styles.card}>
      {/* Sử dụng class từ CSS module */}
      <div className={styles["image-container"]}>
        <Image
          className="w-full h-48 object-cover"
          src={imageUrl} // Sử dụng hình ảnh mặc định nếu không có hình ảnh
          alt={name}
          width={300}
          height={200}
        />
        <div className={styles.price}>{price}</div>
      </div>
      <label className={styles.favorite}>
        <input defaultChecked type="checkbox" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#000000">
          <path d="M12 20a1 1 0 0 1-.437-.1C11.214 19.73 3 15.671 3 9a5 5 0 0 1 8.535-3.536l.465.465.465-.465A5 5 0 0 1 21 9c0 6.646-8.212 10.728-8.562 10.9A1 1 0 0 1 12 20z" />
        </svg>
      </label>
      <div className={styles.content}>
        <div className={styles.brand}>{name}</div>
        <div className={styles["product-name"]}>{address}</div>
      </div>
      <div className={styles["button-container"]}>
        <button
          className={`${styles.button} ${styles["buy-button"]}`}
          onClick={handleDetail}>
          Detail
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
