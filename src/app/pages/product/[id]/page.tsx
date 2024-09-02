"use client";

import React, { useEffect, useState, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../../../../service/interfaces/Product";
import { fetchData } from "../../../../service/api";
import { productApiPath } from "@/utils/apiPath";
import "../../../../styles/globals.css";
import { IMG_URL } from "@/service/api";
import "../../../../styles/productDetail.css";
import Button from "../../../../component/Button";
import BookingForm from "@/component/BookingForm";
import { houseApiPath } from "@/utils/admin/apiPath";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import { EditContractProps } from "../../../../service/interfaces/Product";
import { Status } from "../../../../service/interfaces/Product";
import type { FormData } from "../../../../service/interfaces/Product";
import { FormImage } from "../../../../service/interfaces/Product";
import Image from "next/image";
import { Image as ImageType } from "../../../../service/interfaces/Product";


const ProductDetail: React.FC<EditContractProps> = ({ params }) => {
  const [data, setData] = useState<Product | null>(null);
  const [role, setRole] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    type: "",
    description: "",
    price: 0,
    electricityFee: "",
    waterFee: "",
    gasFee: "",
    address: "",
    status: "",
    images: [] as FormImage[],
  });
  const [statuses, setStatuses] = useState<Status[]>([]); // Danh sách trạng thái
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Tham chiếu tới input file

  const houseId = params.id;
  const router = useRouter();


  // useEffect(() => {
  //   document.title = "Product detail | xinchao";

  //   console.log(params);
    
  //   const token = localStorage.getItem("token");
  //   const userRole = localStorage.getItem("role") || "";
  //   setRole(userRole);

  //   if (!token) {
  //     router.push("/login");
  //   } else {
  //     fetchData(`${productApiPath.getProductById}/${params.id}`)
  //       .then((response: Product) => {
  //         setData(response);
  //         console.log(response);
          
  //         setFormData({
  //           name: response.name,
  //           type: response.type,
  //           description: response.description,
  //           price: response.price,
  //           electricityFee: response.electricityFee,
  //           waterFee: response.waterFee,
  //           gasFee: response.gasFee,
  //           address: response.address,
  //           status: response.status.description,
  //           images: response.image.map((img) => ({
  //             file: null,
  //             imageUrl: `${IMG_URL}/${img.imageUrl}`, // Assuming `imageUrl` property exists in Image
  //           })),
  //         });
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching data:", error);
  //       });

  //     // Lấy danh sách trạng thái
  //     fetchData(houseApiPath.getAllStatus)
  //       .then((response) => {
  //         setStatuses(response); // Giả sử response trả về là danh sách trạng thái
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching statuses:", error);
  //       });
  //   }
  // }, [params.id, router]);


  useEffect(() => {
    document.title = "Product detail | xinchao";

    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role") || "";
    setRole(userRole);

    if (!token) {
      router.push("/login");
    } else {
      fetchProductData();
      fetchStatuses();
    }
  }, [params.id, router]);


  const fetchProductData = async () => {
    try {
      const response: Product = await fetchData(
        `${productApiPath.getProductById}/${params.id}`
      );
      setData(response);

      
      
      // Cập nhật form data từ dữ liệu sản phẩm
      setFormData({
        name: response.name,
        type: response.type,
        description: response.description,
        price: response.price,
        electricityFee: response.electricityFee,
        waterFee: response.waterFee,
        gasFee: response.gasFee,
        address: response.address,
        status: response.status.description,
        images: response.imageUrl.map((img) => ({
          file: null,
          imageUrl: `${IMG_URL}/${img.imageUrl}`,
        })),
      });

    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const fetchStatuses = async () => {
    try {
      const response = await fetchData(houseApiPath.getAllStatus);
      setStatuses(response); // Giả sử response trả về là danh sách trạng thái
    } catch (error) {
      console.error("Error fetching statuses:", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    // Xóa tất cả ảnh cũ
    if (data && data.imageUrl.length > 0) {
      setFormData((prev) => ({ ...prev, images: [] }));
    }
  };

  const handleDelete = () => {
    const response = fetchData(`${houseApiPath.deleteProduct}/${houseId}`, {
      method: "DELETE",
    });
    router.push("/pages/home")
  }

 const handleInputChange = (
   e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
 ) => {
   const { name, value } = e.target;
   setFormData((prev) => ({ ...prev, [name]: value }));
 };


  const handleStatusChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target as HTMLInputElement; // Type assertion
    const files = input.files;

    if (files && files.length > 0) {
      const newImages = Array.from(files).map((file) => ({
        file,
        imageUrl: URL.createObjectURL(file), // Create URL for each image
      }));
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImages], // Add new images to the list
      }));
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSaveClick = async () => {
    const selectedStatus = statuses.find(
      (status) => status.description === formData.status
    );

    const formDataToSubmit = new FormData();
    formDataToSubmit.append(
      "product",
      JSON.stringify({
        name: formData.name, // Có thể cần lấy từ formData nếu người dùng có thể thay đổi tên
        type: formData.type,
        description: formData.description,
        price: formData.price,
        electricityFee: formData.electricityFee,
        waterFee: formData.waterFee,
        gasFee: formData.gasFee,
        address: formData.address,
        statusId: selectedStatus ? selectedStatus.id : null, // Lấy statusId
      })
    );

    formData.images.forEach((image) => {
      if (image.file) {
        formDataToSubmit.append("images", image.file);
      }
    });

    try {
      const result = await fetchData(
        `${houseApiPath.updateProduct}/${houseId}`,
        {
          method: "PUT",
          body: formDataToSubmit,
        }
      );


      // Fetch updated product data
      const updatedData = await fetchData(
        `${productApiPath.getProductById}/${houseId}`
      );
      setData(updatedData);
      setIsEditing(false);
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Failed to update product.");
    }
  };


  const handleCancelClick = () => {
    setIsEditing(false);
    setFormData({
      name: data?.name || "",
      type: data?.type || "",
      description: data?.description || "",
      price: data?.price || 0,
      electricityFee: data?.electricityFee || "",
      waterFee: data?.waterFee || "",
      gasFee: data?.gasFee || "",
      address: data?.address || "",
      status: data?.status.description || "",
      images: data?.imageUrl
        ? data.imageUrl.map((img) => ({ file: null, imageUrl: img.imageUrl }))
        : [],
    });
  };

  if (!data) {
    return (
      <div className="container mx-auto p-4">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6 relative">
        {/* <h1 className="text-3xl font-bold mb-4">{data.name}</h1> */}
        {role === "ADMIN" || role === "SUPER_ADMIN" ? (
          <div className="absolute top-0 right-6 flex space-x-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSaveClick}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
                <button
                  onClick={handleCancelClick}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  Cancel
                </button>
              </>
            ) : (
              <>
                <Button onClick={handleEditClick}>Edit</Button>
                <Button onClick={handleDelete}>Delete</Button>
              </>
            )}
          </div>
        ) : null}
        <div className="mb-4 mt-10">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full"
                placeholder="Name"
              />
              <select
                value={formData.type}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full"
                required>
                <option value="house">House</option>
                <option value="room">Room</option>
              </select>
              <select
                value={formData.electricityFee}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full"
                required>
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
                value={formData.waterFee}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <input
                type="text"
                placeholder="Gas fee"
                value={formData.gasFee}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full"
                required
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full"
                placeholder="Description"
                style={{ minHeight: "150px", resize: "vertical" }}
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full"
                placeholder="Price"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="border p-2 mb-2 w-full"
                placeholder="Address"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleStatusChange}
                className="border p-2 mb-2 w-full">
                <option value="">Select Status</option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.description}>
                    {status.description}
                  </option>
                ))}
              </select>
              <div className="flex items-center mb-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAddImage}
                  className="hidden"
                  accept="image/*"
                  multiple // Cho phép chọn nhiều ảnh
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-gray-800 text-white p-2 rounded">
                  Add images
                </button>
              </div>
              <h2 className="text-xl font-semibold mt-4 mb-2">Images:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image.imageUrl}
                      alt={`Image ${index + 1}`}
                      className="rounded-lg w-full h-auto object-cover"
                      style={{ aspectRatio: "1 / 1" }}
                      width={500}
                      height={300}
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white">
                      <MdDeleteForever />
                    </button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-700 mb-2">
                <strong>Name:</strong> {data.name}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Type:</strong> {data.type}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Electricity fee:</strong> {data.electricityFee}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Water fee:</strong> {data.waterFee}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Gas fee:</strong> {data.gasFee}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Description:</strong> {data.description}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Price:</strong> ${data.price}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> {data.address}
              </p>
              <h2 className="text-xl font-semibold mt-4 mb-2">Status:</h2>
              <p className="text-gray-700">{data.status.description}</p>
              <h2 className="text-xl font-semibold mt-4 mb-2">Images:</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {data?.imageUrl && data.imageUrl.length > 0 ? (
                  data.imageUrl.map((image: ImageType) => (
                    <Image
                      key={image.id}
                      src={`${IMG_URL}/${image.imageUrl}`}
                      alt={data.name}
                      className="rounded-lg w-full h-auto object-cover"
                      style={{ aspectRatio: "1 / 1" }}
                      width={500}
                      height={300}
                    />
                  ))
                ) : (
                  <p>No images available</p>
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <Button onClick={() => router.push("/pages/findAround")}>
            Find other
          </Button>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <BookingForm roomId={houseId} />
      </div>
    </div>
  );
};

export default ProductDetail;
