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
import BookingChart from "@/component/admin/BookingChart";

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
      fetchData(productApiPath.getAllProducts)
        .then((data: Product[]) => {
          setData(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [router]);

  const filteredData = data.filter(
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
    <div className="max-w-7xl mx-auto p-4 h-screen w-screen overflow-y-auto">
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Search by name or type or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button>
          <AddProductButton />
        </button>
        <button>
          <GoToMapButton />
        </button>
        
      </div>
      <BookingChart />
    </div>
  );
};

export default Products;
