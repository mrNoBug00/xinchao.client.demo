import { IMG_URL } from "@/service/api";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "../styles/globals.css";
import ViewHouseButton from "./ViewHouseButton";
import { useRouter } from "next/navigation";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { formatCurrency } from "../utils/formatCurrency";


interface Image {
  id: number;
  imageUrl: string;
  imagePath: string;
}

interface Status {
  id: number;
  name: string;
  description: string;
}

interface Product {
  id: number;
  name: string;
  type: string;
  description: string;
  status: Status;
  price: number;
  numberOfTenantsByRoomRate: string;
  address: string;
  image: Image[];
  author: string | null;
}

interface CardProps {
  product: Product;
}

const Card: React.FC<CardProps> = ({ product }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [photoIndex, setPhotoIndex] = useState<number>(0);
  const router = useRouter();

  const slides = product.image.map((img) => ({
    src: `${IMG_URL}/${img.imageUrl}`,
    alt: product.name,
  }));

  const handleViewHouseClick = (id: number) => {
    router.push(`/pages/product/${id}`);
  };

  const truncateText = (text: string, length: number) => {
    if (text.length > length) {
      return text.substring(0, length) + "...";
    }
    return text;
  };

  const notify = () => {
    toast.success("Copied!", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  console.log(product);
  
  const handleSignContractClick = () => {
    
    const productData = encodeURIComponent(JSON.stringify(product));
    router.push(`/pages/contract?product=${productData}`);
  };

  const maxImagesToShow = 3;
  const remainingImages = product.image.length - maxImagesToShow;

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">
        {truncateText(product.name, 10)}
      </h2>
      <CopyToClipboard text={product.address} onCopy={notify}>
        <p
          className="text-sm text-gray-600 mb-2 cursor-pointer"
          title="Click to copy">
          Address: {truncateText(product.address, 10)}
        </p>
      </CopyToClipboard>
      <p className="text-sm text-gray-600 mb-2">Type: {product.type}</p>
      <CopyToClipboard text={product.description} onCopy={notify}>
        <p className="text-gray-700 mb-4 cursor-pointer" title="Click to copy">
          {truncateText(product.description, 10)}
        </p>
      </CopyToClipboard>
      <p className="text-sm text-gray-600 mb-2">
        Status: {product.status.description}
      </p>
      <p className="text-lg font-bold text-blue-500 mb-2">
        Price: {formatCurrency(product.price)}
      </p>
      <p className="text-lg font-bold text-gray-600 mb-2">
        {product.type} price for {product.numberOfTenantsByRoomRate ?? 1} people
      </p>
      <div className="grid grid-cols-3 gap-2">
        {product.image.slice(0, maxImagesToShow).map((img, index) => (
          <div key={img.id} className="relative">
            <Image
              src={`${IMG_URL}/${img.imageUrl}`}
              alt={product.name}
              width={500}
              height={300}
              className="card-image rounded-md cursor-pointer"
              onClick={() => {
                setPhotoIndex(index);
                setIsOpen(true);
              }}
            />
            {index === 2 && remainingImages > 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-md opacity-60">
                <span className="text-center text-2xl font-bold">
                  +{remainingImages}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 mr-4 space-x-2">
        <ViewHouseButton onClick={() => handleViewHouseClick(product.id)}>
          Details
        </ViewHouseButton>
        {product.status.id === 1 && (
          <button
            className="bg-yellow-500 text-white p-2 rounded-md mt-2"
            onClick={handleSignContractClick}>
            Sign Contract
          </button>
        )}
      </div>
      <Lightbox
        slides={slides}
        index={photoIndex}
        open={isOpen}
        close={() => setIsOpen(false)}
      />
      <ToastContainer />
    </div>
  );
};

export default Card;
