import React from "react";
import styles from "../styles/DownloadImageCard.module.css";
import Image from "next/image";
import CloseButton from "./CloseButton";
import DownloadButton from "./DownloadButton";
import NewTabButton from "./NewTabButton";

interface DownloadImageCardProps {
  imageUrl: string | null;
  closeModal: () => void;
  imageName: string;
}

const DownloadImageCard: React.FC<DownloadImageCardProps> = ({
  imageUrl,
  imageName,
  closeModal,
}) => {
  const handleDownload = async (imageUrl: string | null, imageName: string) => {
    if (imageUrl) {
      try {
        // Sử dụng fetch để tải ảnh
        const response = await fetch(imageUrl);

        // Kiểm tra xem ảnh có được tải thành công không
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }

        // Chuyển dữ liệu thành blob
        const imageBlob = await response.blob();

        // Tạo một URL từ blob
        const imageObjectURL = URL.createObjectURL(imageBlob);

        // Tạo thẻ <a> để tải về ảnh
        const link = document.createElement("a");
        link.href = imageObjectURL;
        link.download = `${imageName}.jpg`; // Đặt tên file ảnh

        // Mô phỏng hành động click để tải ảnh
        link.click();

        // Giải phóng URL blob khi không cần thiết nữa
        URL.revokeObjectURL(imageObjectURL);
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
  };

  const handleOpenNewTab = (imageUrl: string | null) => {
    if (imageUrl) {
       window.open(imageUrl, "_blank"); 
    }
  };

  

  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        <Image
          src={imageUrl || "/logo.jpg"}
          alt="image"
          layout="fill" /* Đặt layout để ảnh bao phủ khung */
          className={styles.image}
        />
      </div>
      <div className={styles.action}>
        <div className={styles.buttonsContainer}>
          <button
            type="button"
            onClick={() => {
              handleDownload(imageUrl, imageName);
            }}>
            <DownloadButton />
          </button>

          <button
            type="button"
            onClick={() => {
              handleOpenNewTab(imageUrl);
            }}>
            <NewTabButton />
          </button>
        </div>

        <button onClick={closeModal}>
          <CloseButton />
        </button>
      </div>
    </div>
  );
};

export default DownloadImageCard;
