"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import "../../../../../../styles/globals.css";
import { productApiPath } from "@/utils/apiPath";
import Card from "@/component/Card";
import { motion, useAnimation } from "framer-motion";
import Skeleton from "@/component/Skeleton";
import  GoToMapButton  from "@/component/GoToMapButton";

const CategoryPage: React.FC = () => {
  const params = useParams(); 
  const categoryName = params.name; 
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const controls = useAnimation();
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fetchProducts = async () => {
        try {
          const response = await fetch(
            `${productApiPath.getProductByCategoryName}/${categoryName}`
          );
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [categoryName]);

  const filteredData = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.address.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    controls.start("visible");
  }, [filteredData, controls]);

  const findAround = () => {
    router.push("/pages/findAround");
  };

  if (loading)
    return (
      <div className="relative loader-overlay justify-items-center items-center">
        <Skeleton />
        <Skeleton />
        <Skeleton />
        <Skeleton />

        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div className="loader"></div>
        </div>
      </div>
    );


  return (
    <div className="grid m-4">
      {/* Thanh tìm kiếm nằm trên cùng */}
      <div className="mb-4 flex space-x-2 justify-center">
        <input
          type="text"
          className="w-full sm:w-96 p-2 border border-gray-300 rounded-md"
          placeholder="Search by name or type or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={findAround}>
          <GoToMapButton />
        </button>
      </div>

      {/* Các sản phẩm */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center items-center">
        {filteredData
          .slice() // Tạo một bản sao của mảng để không thay đổi mảng gốc
          .reverse() // Đảo ngược mảng
          .map((product) => (
            <motion.div
              key={product.id}
              className="product-card"
              whileHover={{ scale: 0.9, zIndex: 1 }}
              whileTap={{ scale: 0.9 }}
              animate={controls}
              initial="hidden"
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 100 },
              }}
              transition={{ duration: 0.5 }}>
              <Card product={product} />
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default CategoryPage;

