import React, { useState } from "react";
import styles from "../styles/FormDeposit.module.css";
import { useTranslations } from "next-intl";
import Image from "next/image";
import FileUpload from "../component/FileUploadProps";
import { Product } from "@/service/interfaces/Product";
import { depositApiPath, uploadImageApiPath } from "@/utils/apiPath";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Define sample data for the form
interface ScheduleViewingFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  images: File[];
}

interface FormDepositProps {
  productDetail: Product;
}

const Form: React.FC<FormDepositProps> = ({ productDetail }) => {
  const t = useTranslations("FormDeposit");
  const [formData, setFormData] = useState<ScheduleViewingFormData>({
    name: "",
    phone: "",
    date: "",
    time: "",
    images: [],
  });
  const [errors, setErrors] = useState<Partial<ScheduleViewingFormData>>({});
  const [imagePreviews, setImagePreviews] = useState<{
    [key: string]: string[];
  }>({
    contact: [],
    receipt: [],
  });

  // Handle image change for different categories
  const handleImageChange = async (files: File[], category: string) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    // Create preview images for the selected files
    const newPreviews = await Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );

    setImagePreviews((prev) => ({
      ...prev,
      [category]: [...prev[category], ...newPreviews],
    }));
  };

  // Remove image based on category and index
  const removeImage = (category: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setImagePreviews((prev) => ({
      ...prev,
      [category]: prev[category].filter((_, i) => i !== index),
    }));
  };

  // Function to upload images
  const uploadImage = async (image: File): Promise<string[] | null> => {
    const formData = new FormData();
    formData.append("files", image);

    try {
      const response = await fetch(uploadImageApiPath.uploadImage, {
        method: "POST",
        body: formData,
      });

      // Khai báo kiểu của dữ liệu trả về
      const data: { id: string }[] = await response.json();
      const imageIds = data.map((item) => item.id); // Lấy tất cả các id
      return imageIds; // Return image ID from server
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(t("Error uploading image"));
      return null;
    }
  };


  // Function to create deposit
  const createDeposit = async () => {
    try {
      // Upload all images and get their IDs
      const contactImageIds = await Promise.all(
        formData.images.slice(0, 2).map(uploadImage) // Limit to 2 images for contactImage
      );
      const receiptImageIds = await Promise.all(
        formData.images.slice(2).map(uploadImage) // Limit to 2 images for receiptImage
      );

      // Flatten the results into a single array (get rid of arrays inside arrays)
      const validContactImageIds = contactImageIds.flat().filter(Boolean);
      const validReceiptImageIds = receiptImageIds.flat().filter(Boolean);


      // Check if there are enough images for both contact and receipt
      if (validContactImageIds.length < 1 || validReceiptImageIds.length < 1) {
        throw new Error(
          "Please upload at least 1 contact image and 1 receipt image"
        );
      }

      // Data to be sent to API
      const requestData = {
        name: formData.name,
        phone: formData.phone,
        productId: productDetail.id, // Product ID
        contactImageId: validContactImageIds, // Valid image IDs
        receiptImageId: validReceiptImageIds, // Valid image IDs
      };

      const response = await fetch(depositApiPath.createDeposit, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to create deposit");
      }

      const data = await response.json();
      toast.success(t("Deposit created successfully"));
    } catch (error) {
      console.error("Error creating deposit:", error);
      toast.error(t("An unexpected error occurred"));
    }
  };



  return (
    <div className={styles.container}>
      <ToastContainer />
      <div className={`${styles.card} ${styles.cart}`}>
        <label className={styles.title}>
          {t("title")} {t(productDetail.category.name)}
        </label>
        <div className={styles.steps}>
          <div className={styles.step}>
            <div>
              <span>{t("Name")}</span>
              <form>
                <input
                  type="text"
                  placeholder={t("Enter your name")}
                  className={styles.input_field}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </form>
            </div>
            <hr />
            <div>
              <span>{t("Phone")}</span>
              <form>
                <input
                  type="text"
                  placeholder={t("Enter your phone number")}
                  className={styles.input_field}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </form>
            </div>
            <hr />
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("ContactQrCode")} (zalo or line)
              </label>
              <FileUpload
                onFileSelect={(files) => handleImageChange(files, "contact")}
              />
              <div className="mt-2 grid grid-cols-2 gap-2">
                {imagePreviews.contact.map((preview, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={200}
                      height={200}
                      className="rounded-md object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => removeImage("contact", index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      aria-label="Remove image">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("Receipt")}
              </label>
              <FileUpload
                onFileSelect={(files) => handleImageChange(files, "receipt")}
              />
              <div className="mt-2 grid grid-cols-2 gap-2">
                {imagePreviews.receipt.map((preview, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      width={200}
                      height={200}
                      className="rounded-md object-cover"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={() => removeImage("receipt", index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      aria-label="Remove image">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.card} ${styles.checkout}`}>
        <div className={styles.footer}>
          <label className={styles.price}>
            {productDetail.price ? productDetail.price / 2 : 0}
          </label>
          <button
            className={styles["checkout-btn"]}
            onClick={createDeposit} // Call create deposit function
          >
            {t("Send")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form;
