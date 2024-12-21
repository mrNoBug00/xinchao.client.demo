import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { productApiPath } from "@/utils/apiPath";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: { imageUrl: string }[];
  address: string;
  type?: { name: string };
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
    

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetch(productApiPath.getAllProducts)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data);
          setLoading(false);
        });
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  const groupedByCategory = products.reduce((groups, product) => {
    const category = (product.type?.name || "Other").toUpperCase();
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(product);
    return groups;
  }, {} as Record<string, Product[]>);

  if (loading)
    return (
      <div className="loader-overlay">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="container mx-auto px-4">
      {Object.keys(groupedByCategory).map((category) => (
        <div key={category} className="bg-slate-200 rounded-lg">
          <div className="flex justify-between items-center text-2xl font-semibold mt-8 mb-2 border-gray-400 p-2 ">
            <h2 className="ml-2">{category}</h2>
            <div
              className="flex items-center text-blue-500 mr-2 cursor-pointer"
              onClick={() =>
                router.push(`/pages/product/category/${category}`)
              }>
              <span>more</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 ml-2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Giới hạn chỉ lấy tối đa 4 sản phẩm cho mỗi category */}
            {groupedByCategory[category].slice(0, 4).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={product.price}
                images={product.image}
                address={product.address}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
