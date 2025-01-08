import { IMG_URL } from "@/service/api";
import { categoryApiPath, productApiPath } from "@/utils/apiPath";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";
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
  image: Array<{ id: string; imageUrl: string }>;
  category: { name: string }; // Thêm category cho sản phẩm
}

interface Category {
  id: number;
  name: string;
}

const ProductPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const t = useTranslations("ProductPage");

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(categoryApiPath.getAllCategory);
      const data = await response.json();
      setCategories(data);
    };

    const fetchAllProducts = async () => {
      const response = await fetch(productApiPath.getAllProducts);
      const data = await response.json();
      setProducts(data);
    };

    fetchCategories();
    fetchAllProducts();
  }, []);

  // Hàm phân loại sản phẩm theo category.name và chỉ lấy 5 sản phẩm đầu tiên
  const categorizedProducts = categories.map((category) => {
    // Lọc sản phẩm theo category.name
    const filteredProducts = products
      .filter((product) => product.category.name === category.name)
      .slice(0, 5); // Chỉ lấy 5 sản phẩm đầu tiên

    return {
      ...category,
      products: filteredProducts, // Gán sản phẩm vào category tương ứng
    };
  });

  // Hàm điều hướng tới trang chi tiết của category
  const handleMoreClick = (categoryName: string) => {
    router.push(`/pages/product/category/${categoryName}`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full mt-2 mb-8">
        <ProductBanner />
      </div>
      <div className="w-full mx-auto mt-2">
        {categorizedProducts.map((category) => (
          <div key={category.id} className="mb-8 bg-[#f5f1e6] rounded-xl">
            <div className="flex justify-between items-center">
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

            {/* Hiển thị sản phẩm của từng category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4 justify-items-center items-center">
              {category.products.length > 0 ? (
                category.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    description={product.description}
                    price={product.price}
                    images={
                      product.image.length > 0
                        ? [{ imageUrl: product.image[0].imageUrl }]
                        : []
                    }
                    address={product.address}
                  />
                ))
              ) : (
                <p>{t("NoProductsAvailable")}</p> // Thông báo khi không có sản phẩm trong danh mục
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
