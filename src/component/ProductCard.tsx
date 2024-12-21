import { IMG_URL } from "@/service/api";
import React from "react";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  images: { imageUrl: string }[];
  address: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  description,
  price,
  images,
  address,
}) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
      <img
        className="w-full h-48 object-cover"
        src={`${IMG_URL}/${images[0].imageUrl}`}
        alt={name}
      />
      <div className="px-6 py-4 bg-slate-50">
        <div className="font-bold text-xl mb-2 ">{name}</div>
        <p className="text-gray-700 text-base">{description}</p>
        <p className="text-gray-500 text-sm">Price: ${price}</p>
        <p className="text-gray-500 text-sm">Address: {address}</p>
      </div>
    </div>
  );
};

export default ProductCard;
