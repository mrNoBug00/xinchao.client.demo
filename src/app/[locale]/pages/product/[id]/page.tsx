"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../../../../../service/interfaces/Product";
import { productApiPath } from "@/utils/apiPath";
import "../../../../../styles/globals.css";
import { IMG_URL } from "@/service/api";
import "../../../../../styles/productDetail.css";
import "react-toastify/dist/ReactToastify.css";
import type { ProductDetailProps } from "../../../../../service/interfaces/Product";
import Image from "next/image";
import { Image as ImageType } from "../../../../../service/interfaces/Product";
import axios from "axios";
import styles from "../../../../../styles/DetailCard.module.css";
import Skeleton from "@/component/Skeleton";
import FormDeposit from "../../../../../component/FormDeposit";
import { useTranslations } from "next-intl";
import CheckHouseButton from "@/component/CheckHouseButton";
import TWBankCard from "@/component/TWBankCard";
import VNBankCard from "@/component/VNBankCard";

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Product | null>(null);
  const [address, setAddress] = useState<string>("")
  const t = useTranslations("ProductDetail");
  const router = useRouter();
  const fetchProductData = useCallback(async () => {
    try {
      const response = await axios.get<Product>(
        `${productApiPath.getProductById}/${params.id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    document.title = "Product Detail | xinchao";
    fetchProductData();
    setAddress(`${data?.city}, ${data?.area}`);
  }, [params.id, fetchProductData]);

  if (loading)
    return (
      <div className="relative loader-overlay justify-items-center items-center">
        <Skeleton />

        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div className="loader"></div>
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles["image-grid"]}>
          {data?.image && data.image.length > 0 ? (
            data.image.map((image: ImageType) => (
              <Image
                key={image.id}
                src={`${IMG_URL}/${image.imageUrl}`}
                alt={data.name}
                className="rounded-lg w-full h-auto object-cover"
                style={{ aspectRatio: "1 / 1" }}
                width={100}
                height={100}
              />
            ))
          ) : (
            <p>{t("No images available")}</p>
          )}
        </div>
        <div className={styles["card-info"]}>
          <p className={styles["text-title"]}>{data?.name}</p>
          <p className={styles["text-body"]}>{data?.description}</p>
          <p className={styles["text-body"]}>{t("Type")}: {t(data?.category?.name)}</p>
          <p className={styles["text-body"]}>
            {t("Electricity Fee")}: {t(data?.electricityFee)}
          </p>
          <p className={styles["text-body"]}>{t("Water Fee")}: {data?.waterFee}</p>
          <p className={styles["text-body"]}>{t("Gas Fee")}: {data?.gasFee}</p>
          <p className={styles["text-body"]}>{t("Address")}: {address}</p>
          <p className={styles["text-body"]}>
            {t(data?.category.name)} {t("price for")} {data?.numberOfTenantsByRoomRate}{" "}
            {t("people")}
          </p>
        </div>
        <div className={styles["card-footer"]}>
          <span className={styles["text-price"]}>{t("Price")}: {data?.price} TWD</span>
          <button
            onClick={() =>
              router.push(`/pages/product/schedule-viewing/${params.id}`)
            }>
            { data && <CheckHouseButton productDetail={data} />}
          </button>
        </div>

        <div>
          <span className={styles["text-refund"]}>
            {t("When you make a deposit to reserve a place, after signing the contract, we will refund that amount to you")}
          </span>
        </div>
      </div>

      <div className={styles["form-container"]}>
        <div className={styles["form-and-image"]}>
          <div className={styles["form-deposit"]}>
            {data && <FormDeposit productDetail={data} />}
          </div>

          <div className={styles["image-container"]}>
            <div className="flex flex-col border-2 border-gray-300 bg-white rounded-2xl mt-2">
              <span className={styles["text-transfer-money"]}>
                {t("Taiwan Bank Account")}
              </span>
              <TWBankCard />
            </div>

            <div className="flex flex-col border-2 border-gray-300 bg-white rounded-2xl mt-2">
              <span className={styles["text-transfer-money"]}>
                {t("VietNam Bank Account")}
              </span>
              <VNBankCard />
            </div>

            <div className="flex flex-col border-2 border-gray-300 bg-white rounded-lg mt-2">
              <div className="m-2">
                <span className={styles["text-transfer"]}>
                  {t("Please transfer money to one of the two bank accounts above")}
                </span>

                <div className="flex flex-col">
                  <span className={styles["text-transfer"]}>
                    {t("If you transfer in Vietnamese currency")}
                  </span>
                  <span className={styles["text-transfer"]}>
                    {t("We will convert to Taiwanese currency based on the current exchange rate")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
