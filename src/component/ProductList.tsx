import { IMG_URL } from "@/service/api";
import { categoryApiPath } from "@/utils/apiPath";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation"; // Import useRouter để chuyển hướng
import ButtonSeeMore from "../component/ButtonSeeMore";
import ProductBanner from "./ProductBanner";
import { useTranslations } from "next-intl";

interface Product {
  id: string;
  name: string;
  price: number;
  electricityFee: string;
  waterFee: number;
  gasFee: string;
  numberOfTenantsByRoomRate: string;
  address: string;
  description: string;
  imageUrl: Array<{ id: string; imageUrl: string }>;
}

interface Category {
  id: number;
  name: string;
  products: Product[];
}

const ProductPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter(); // Khởi tạo useRouter
  const t = useTranslations("ProductPage");

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(categoryApiPath.getAllCategory);
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  // Hàm điều hướng tới trang chi tiết của category
  const handleMoreClick = (categoryName: string) => {
    router.push(`/pages/product/category/${categoryName}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full mt-2">
        <ProductBanner />
      </div>
      <div className="w-full mx-auto mt-2">
        {categories.map((category) => (
          <div key={category.id} className="mb-8 bg-[#f5f1e6] rounded-xl">
            <div className="flex justify-between items-center ">
              {/* Category name */}
              <h2 className="text-xl m-4 ml-10 font-semibold bg-[#f5f1e6] text-center sm:text-left">
                {t(category.name).toUpperCase()}
              </h2>
              {/* Nút See More nằm bên phải */}
              <div
                className="flex items-center mt-2 text-blue-500 mr-4 cursor-pointer"
                onClick={() => handleMoreClick(category.name)}>
                <ButtonSeeMore />
              </div>
            </div>

            {/* Sử dụng Grid, thay đổi số cột khi màn hình nhỏ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center items-center">
              {/* Hiển thị 4 sản phẩm đầu tiên */}
              {category.products.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  images={product.imageUrl}
                  address={product.address}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;


