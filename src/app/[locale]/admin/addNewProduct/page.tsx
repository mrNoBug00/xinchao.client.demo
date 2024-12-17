"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchData } from "../../../../service/api";
import { houseApiPath } from "@/utils/admin/apiPath";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../styles/globals.css";
import Image from "next/image";
import { companyInfo } from "@/utils/apiPath";
import axios from "axios";


interface Company {
  id: string;
  name: string;
  taxNumber: string;
  address: string;
  line: string;
}


const AddNewProduct: React.FC = () => {
  const router = useRouter();
  const [productName, setProductName] = useState<string>("");
  const [productType, setProductType] = useState<string>("");
  const [productDescription, setProductDescription] = useState<string>("");
  const [productPrice, setProductPrice] = useState<string>("");
  const [productAddress, setProductAddress] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [productElectricityFee, setProductElectricityFee] =
    useState<string>("");
  const [productWaterFee, setProductWaterFee] = useState<string>("");
  const [productGasFee, setProductGasFee] = useState<string>("");
  const [numberOfTenantsByRoomRate, setNumberOfTenantsByRoomRate] =
    useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const token = localStorage.getItem("token");


  const [company, setCompany] = useState<Company>({
    id: "",
    name: "",
    taxNumber: "",
    address: "",
    line: "",
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const data: Company[] = await fetchData(companyInfo.getCompanyInfo);
        if (data && data.length > 0) {
          setCompany(data[0]);
        }
      } catch (error) {
        console.error("Error fetching company info:", error);
      }
    };

    fetchCompanyInfo();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const id = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append(
      "product",
      JSON.stringify({
        name: productName,
        type: productType,
        description: productDescription,
        price: Number(productPrice),
        numberOfTenantsByRoomRate: numberOfTenantsByRoomRate,
        electricityFee: productElectricityFee,
        waterFee: Number(productWaterFee),
        gasFee: productGasFee,
        address: productAddress,
      })
    );
    formData.append("userId", id ?? "");
    formData.append("companyInfoId", company.id);

    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(houseApiPath.addNewProduct, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Product added successfully!", {
          position: "top-center",
          autoClose: 1000,
        });

        setTimeout(() => {
          router.push("/admin/home");
        }, 2000);
      } else {
        // Nếu status không phải 200, xử lý lỗi
        toast.error("Failed to add product", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error("Error adding product: " + error.message, {
          position: "top-center",
          autoClose: 2000,
        });
        console.error("Error adding product:", error.message);
      } else {
        toast.error("An unexpected error occurred.", {
          position: "top-center",
          autoClose: 2000,
        });
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="p-8 h-[1000px] mx-auto border border-gray-300 rounded-lg shadow-md">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={productType}
          onChange={(e) => setProductType(e.target.value)}
          className="w-full p-2 border rounded"
          required>
          <option value="" disabled>
            Select product type
          </option>
          <option value="house">House</option>
          <option value="room">Room</option>
        </select>
        <select
          value={productElectricityFee}
          onChange={(e) => setProductElectricityFee(e.target.value)}
          className="w-full p-2 border rounded"
          required>
          <option value="" disabled>
            Select Electricity Fee
          </option>
          <option value="In summer, 6 NTD/unit; in other seasons, 5 NTD/unit.">
            In summer, 6 NTD/unit; in other seasons, 5 NTD/unit.
          </option>
          <option value="All rooms are equally divided.">
            All rooms are equally divided.
          </option>
        </select>
        <input
          type="text"
          placeholder="Water Fee"
          value={productWaterFee}
          onChange={(e) => setProductWaterFee(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Gas fee"
          value={productGasFee}
          onChange={(e) => setProductGasFee(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Number of renter"
          value={numberOfTenantsByRoomRate}
          onChange={(e) => setNumberOfTenantsByRoomRate(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Product Address"
          value={productAddress}
          onChange={(e) => setProductAddress(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="hidden"
          ref={fileInputRef}
          required
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-gray-800 text-white p-2 rounded">
          Add images
        </button>

        <div className="grid grid-cols-6 gap-2 mt-4 max-h-60 overflow-y-auto">
          {images.map((image, index) => (
            <div key={index} className="relative">
              <Image
                src={URL.createObjectURL(image)}
                alt={`Selected Image ${index + 1}`}
                className="w-full h-full object-cover rounded border"
                style={{ aspectRatio: "1 / 1" }} // Đảm bảo hình vuông
                width={500}
                height={300}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                &times;
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddNewProduct;
