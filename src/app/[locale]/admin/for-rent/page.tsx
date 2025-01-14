"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchData } from "../../../../service/api";
import Card from "../../../../component/admin/Card";
import { productApiPath } from "@/utils/apiPath";
import "../../../../styles/globals.css";
import { Button } from "@headlessui/react";
import {
  motion,
  useAnimation,
  useViewportScroll,
  useTransform,
} from "framer-motion";
import { Product } from "../../../../service/interfaces/Product";
import AddProductButton from "@/component/AddProductButton";
import GoToMapButton from "@/component/GoToMapButton";
// interface Image {
//   id: number;
//   imageUrl: string;
//   imagePath: string;
// }

// interface Status {
//   id: number;
//   name: string;
//   description: string;
// }

// interface Product {
//   id: number;
//   name: string;
//   type: string;
//   description: string;
//   status: Status;
//   price: number;
//   numberOfTenantsByRoomRate: string;
//   address: string;
//   image: Image[];
//   author: string | null;
// }

const Products: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<Product[]>([]);
  const [search, setSearch] = useState<string>("");
  const controls = useAnimation();
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [0, 1], [0, 1]);

  useEffect(() => {
    document.title = "Home | xinchao";

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    } else {
      fetchData(productApiPath.getProductForRent)
        .then((data: Product[]) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [router]);

  const filteredData = data
    .filter(
      (product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.name.toLowerCase().includes(search.toLowerCase())
        // || product.address.toLowerCase().includes(search.toLowerCase())
    );

  const findAround = () => {
    router.push("/pages/findAround");
  };

  const addNewProduct = () => {
    router.push("/admin/addNewProduct");
  };

  useEffect(() => {
    controls.start("visible");
  }, [filteredData, controls]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-4 flex space-x-2 justify-end">
        {/* <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Search by name or type or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}

        <button onClick={addNewProduct}>
          <AddProductButton />
        </button>
        <button onClick={findAround}>
          <GoToMapButton />
        </button>
      </div>
      <div className="h-[800px] overflow-y-scroll grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {filteredData.length > 0 ? (
          filteredData
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
            ))
        ) : (
          <div className="h-[800px] grid grid-cols-4">
            <p className="text-gray-500">No Product</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
