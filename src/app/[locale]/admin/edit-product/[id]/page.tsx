"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Product,
  FormImage,
  EditContractProps,
  Type,
  Status,
} from "../../../../../service/interfaces/Product";
import {
  categoryApiPath,
  productApiPath,
  statusApiPath,
} from "@/utils/apiPath";
import "../../../../../styles/globals.css";
import Image from "next/image";
import { IMG_URL } from "@/service/api";
import { fetchData } from "../../../../../service/api";

const EditProduct: React.FC<EditContractProps> = ({ params }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<Type[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const router = useRouter();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Fetch product data
    const fetchProduct = async () => {
      try {
        const response = await axios.get<Product>(
          `${productApiPath.getProductById}/${params.id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    // Fetch categories and statuses
    const fetchCategoriesAndStatuses = async () => {
      try {
        const [categoriesResponse, statusesResponse] = await Promise.all([
          fetchData(`${categoryApiPath.getAllCategory}`),
          fetchData(`${statusApiPath.getAllStatus}`),
        ]);
        setCategories(categoriesResponse);
        setStatuses(statusesResponse);
      } catch (error) {
        console.error("Error fetching categories and statuses:", error);
      }
    };

    fetchProduct();
    fetchCategoriesAndStatuses();
  }, [params.id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) =>
      prevProduct ? { ...prevProduct, [name]: value } : null
    );
  };

const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setImages((prevImages) => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product) {
      const formData = new FormData();
      formData.append(
        "product",
        JSON.stringify({
          name: product.name,
          category: Number(product.category), // Đảm bảo là số
          statusId: Number(product.status?.id), // Đảm bảo là số
          description: product.description,
          price: Number(product.price),
          electricityFee: product.electricityFee,
          waterFee: Number(product.waterFee),
          gasFee: product.gasFee,
          address: product.address,
          numberOfTenantsByRoomRate: Number(product.numberOfTenantsByRoomRate),
        })
      );

      formData.append("userId", userId || "");

      formData.append("companyInfoId", product.companyInfo?.id || "");

      images.forEach((image) => {
        formData.append("images", image);
      });

      formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

      console.log(params.id);
      
      try {
        await axios.put(
          `${productApiPath.updateProduct}/${params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        router.push("/admin/for-rent"); // Redirect to products page after successful update
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={product.category.id}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <select
            name="statusId"
            value={product.status?.id || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
            {statuses.map((status) => (
              <option key={status.id} value={status.id}>
                {status.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Electricity Fee</label>
          <select
            value={product.electricityFee}
            onChange={handleChange}
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
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Water Fee</label>
          <input
            type="number"
            name="waterFee"
            value={product.waterFee || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gas Fee</label>
          <input
            type="number"
            name="gasFee"
            value={product.gasFee || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            value={product.address}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Number of Tenants by Room Rate
          </label>
          <input
            type="number"
            name="numberOfTenantsByRoomRate"
            value={product.numberOfTenantsByRoomRate || ""}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4 col-span-2">
          <label className="block text-gray-700">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            ref={fileInputRef}
            required
          />
          {/* <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <Image
                  src={`${IMG_URL}/${img.imageUrl}`}
                  alt={`Preview ${index}`}
                  className="object-cover rounded-md"
                  width={200}
                  height={200}
                />
              </div>
            ))}
          </div> */}
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
