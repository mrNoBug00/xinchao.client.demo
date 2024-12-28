"use client";

import React, {
  useEffect,
  useState,
  useRef,
  ChangeEvent,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { Product } from "../../../../../service/interfaces/Product";
import { fetchData } from "../../../../../service/api";
import { productApiPath } from "@/utils/apiPath";
import "../../../../../styles/globals.css";
import { IMG_URL } from "@/service/api";
import "../../../../../styles/productDetail.css";
import Button from "../../../../../component/Button";
import BookingForm from "@/component/BookingForm";
import { houseApiPath } from "@/utils/admin/apiPath";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDeleteForever } from "react-icons/md";
import { EditContractProps } from "../../../../../service/interfaces/Product";
import { Status } from "../../../../../service/interfaces/Product";
import type {
  FormData,
  ProductDetailProps,
} from "../../../../../service/interfaces/Product";
import { FormImage } from "../../../../../service/interfaces/Product";
import Image from "next/image";
import { Image as ImageType } from "../../../../../service/interfaces/Product";
import axios from "axios";

// const ProductDetail: React.FC<EditContractProps> = ({ params }) => {
//   const [data, setData] = useState<Product | null>(null);
//   const [role, setRole] = useState("");
//   const [isEditing, setIsEditing] = useState(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [formData, setFormData] = useState<FormData>({
//     name: "",
//     type: "",
//     description: "",
//     price: 0,
//     electricityFee: "",
//     waterFee: "",
//     gasFee: "",
//     numberOfTenantsByRoomRate: "",
//     address: "",
//     status: "",
//     images: [] as FormImage[],
//   });
//   const [statuses, setStatuses] = useState<Status[]>([]); // Danh sách trạng thái
//   const fileInputRef = useRef<HTMLInputElement | null>(null); // Tham chiếu tới input file

//   const token = localStorage.getItem("token");
//   const houseId = params.id;
//   const router = useRouter();

//   const fetchProductData = useCallback(async () => {
//     try {
//       const response = await axios.get<Product>(
//         `${productApiPath.getProductById}/${params.id}`
//       );

//       setData(response.data);
//       console.log(response.data.image);

//       // Cập nhật form data từ dữ liệu sản phẩm
//       setFormData({
//         ...formData,
//         name: response.data.name || "",
//         type: response.data.category?.name || "",
//         description: response.data.description || "",
//         price: response.data.price || 0,
//         electricityFee: response.data.electricityFee || "",
//         waterFee: response.data.waterFee || "",
//         gasFee: response.data.gasFee || "",
//         numberOfTenantsByRoomRate:
//           response.data.numberOfTenantsByRoomRate || "",
//         address: response.data.address || "",
//         status: response.data.status?.description || "",
//         images:
//           response.data.image?.map((img) => ({
//             file: null,
//             imageUrl: `${IMG_URL}/${img.imageUrl || ""}`,
//           })) || [],
//       });
//       console.log("Form data:", formData);
//     } catch (error) {
//       console.error("Error fetching product data:", error);
//     } finally {
//       setLoading(false)
//     }
//   }, [params.id]);

//   useEffect(() => {
//     document.title = "Product detail | xinchao";

//     // const token = localStorage.getItem("token");
//     // const userRole = localStorage.getItem("role") || "";
//     // setRole(userRole);

//     // if (!token) {
//     //   router.push("/login");
//     // } else {
//     //   fetchProductData();
//     //   fetchStatuses();
//     // }

//     const timeout = setTimeout(() => {
//       fetchProductData();
//       fetchStatuses();
//     }, 1000);

//     return () => clearTimeout(timeout);
//   }, [params.id, router, fetchProductData]);

//   const fetchStatuses = async () => {
//     try {
//       const response = await fetchData(houseApiPath.getAllStatus);
//       setStatuses(response); // Giả sử response trả về là danh sách trạng thái
//     } catch (error) {
//       console.error("Error fetching statuses:", error);
//     }
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//     // Xóa tất cả ảnh cũ
//     if (data && data.image.length > 0) {
//       setFormData((prev) => ({ ...prev, images: [] }));
//     }
//   };

//   const handleDelete = () => {
//     const response = fetchData(`${houseApiPath.deleteProduct}/${houseId}`, {
//       method: "DELETE",
//     });
//     router.push("/pages/home");
//   };

//   const handleInputChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;

//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleStatusChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData((prev) => ({ ...prev, status: e.target.value }));
//   };

//   const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
//     const input = event.target as HTMLInputElement; // Type assertion
//     const files = input.files;

//     if (files && files.length > 0) {
//       const newImages = Array.from(files).map((file) => ({
//         file,
//         imageUrl: URL.createObjectURL(file), // Create URL for each image
//       }));
//       setFormData((prev) => ({
//         ...prev,
//         images: [...prev.images, ...newImages], // Add new images to the list
//       }));
//     }
//   };

//   const handleRemoveImage = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       images: prev.images.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSaveClick = async () => {
//     const selectedStatus = statuses.find(
//       (status) => status.description === formData.status
//     );

//     const formDataToSubmit = new FormData();
//     formDataToSubmit.append(
//       "product",
//       JSON.stringify({
//         name: formData.name, // Có thể cần lấy từ formData nếu người dùng có thể thay đổi tên
//         type: formData.type,
//         description: formData.description,
//         price: formData.price,
//         electricityFee: formData.electricityFee,
//         waterFee: formData.waterFee,
//         gasFee: formData.gasFee,
//         numberOfTenantsByRoomRate: formData.numberOfTenantsByRoomRate,
//         address: formData.address,
//         statusId: selectedStatus ? selectedStatus.id : null, // Lấy statusId
//       })
//     );

//     formData.images.forEach((image) => {
//       if (image.file) {
//         formDataToSubmit.append("images", image.file);
//       }
//     });

//     try {
//       const response = await axios.post(
//         houseApiPath.addNewProduct,
//         formDataToSubmit,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       // Fetch updated product data
//       const updatedData = await fetchData(
//         `${productApiPath.getProductById}/${houseId}`
//       );
//       setData(updatedData);
//       setIsEditing(false);
//       toast.success("Product updated successfully!");
//     } catch (error) {
//       console.error("Error saving data:", error);
//       toast.error("Failed to update product.");
//     }
//   };

//   const handleCancelClick = () => {
//     setIsEditing(false);
//     setFormData({
//       name: data?.name || "",
//       type: data?.category.name || "",
//       description: data?.description || "",
//       price: data?.price || 0,
//       electricityFee: data?.electricityFee || "",
//       waterFee: data?.waterFee || "",
//       gasFee: data?.gasFee || "",
//       numberOfTenantsByRoomRate: data?.numberOfTenantsByRoomRate || "",
//       address: data?.address || "",
//       status: data?.status?.description || "",
//       images: data?.image
//         ? data.image.map((img) => ({ file: null, imageUrl: img.imageUrl }))
//         : [],
//     });
//   };

//   if (loading)
//     return (
//       <div className="loader-overlay">
//         <div className="loader"></div>
//       </div>
//     );

//   return (
//     <div className="container mx-auto p-4">
//       <div className="bg-white shadow-lg rounded-lg p-6 mb-6 relative">
//         {/* <h1 className="text-3xl font-bold mb-4">{data.name}</h1> */}
//         {role === "ADMIN" || role === "SUPER_ADMIN" ? (
//           <div className="absolute top-0 right-6 flex space-x-2">
//             {isEditing ? (
//               <>
//                 <button
//                   onClick={handleSaveClick}
//                   className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//                   Save
//                 </button>
//                 <button
//                   onClick={handleCancelClick}
//                   className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
//                   Cancel
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Button onClick={handleEditClick}>Edit</Button>
//                 <Button onClick={handleDelete}>Delete</Button>
//               </>
//             )}
//           </div>
//         ) : null}
//         <div className="mb-4 mt-10">
//           {isEditing ? (
//             <>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 className="border p-2 mb-2 w-full"
//                 placeholder="Name"
//               />
//               <select
//                 name="type"
//                 value={formData.type}
//                 onChange={handleInputChange}
//                 className="border p-2 mb-2 w-full"
//                 required>
//                 <option value="House">House</option>
//                 <option value="Room">Room</option>
//                 <option value="Whole floor">Whole floor</option>
//               </select>
//               <select
//                 name="electricityFee"
//                 value={formData.electricityFee}
//                 onChange={handleInputChange}
//                 className="border p-2 mb-2 w-full"
//                 required>
//                 <option value="In summer, 6 NTD/unit; in other seasons, 5 NTD/unit">
//                   In summer, 6 NTD/unit; in other seasons, 5 NTD/unit
//                 </option>
//                 <option value="All rooms are equally divided">
//                   All rooms are equally divided
//                 </option>
//               </select>
//               <input
//                 name="waterFee"
//                 type="text"
//                 placeholder="Water Fee"
//                 value={formData.waterFee}
//                 onChange={handleInputChange}
//                 className="border p-2 mb-2 w-full"
//                 required
//               />
//               <input
//                 name="gasFee"
//                 type="text"
//                 placeholder="Gas fee"
//                 value={formData.gasFee}
//                 onChange={handleInputChange}
//                 className="border p-2 mb-2 w-full"
//                 required
//               />
//               <input
//                 name="numberOfTenantsByRoomRate"
//                 type="text"
//                 placeholder="number of tenants by room rate"
//                 value={formData.numberOfTenantsByRoomRate}
//                 onChange={handleInputChange}
//                 className="border p-2 mb-2 w-full"
//                 required
//               />
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleInputChange}
//                 className="border p-2 mb-2 w-full"
//                 placeholder="Description"
//                 style={{ minHeight: "150px", resize: "vertical" }}
//               />
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={handleInputChange}
//                 className="border p-2 mb-2 w-full"
//                 placeholder="Price"
//               />
//               <input
//                 type="text"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 className="border p-2 mb-2 w-full"
//                 placeholder="Address"
//               />
//               <select
//                 name="status"
//                 value={formData.status}
//                 onChange={handleStatusChange}
//                 className="border p-2 mb-2 w-full">
//                 <option value="">Select Status</option>
//                 {statuses.map((status) => (
//                   <option key={status.id} value={status.description}>
//                     {status.description}
//                   </option>
//                 ))}
//               </select>
//               <div className="flex items-center mb-4">
//                 <input
//                   type="file"
//                   ref={fileInputRef}
//                   onChange={handleAddImage}
//                   className="hidden"
//                   accept="image/*"
//                   multiple // Cho phép chọn nhiều ảnh
//                 />
//                 <button
//                   type="button"
//                   onClick={() => fileInputRef.current?.click()}
//                   className="bg-gray-800 text-white p-2 rounded">
//                   Add images
//                 </button>
//               </div>
//               <h2 className="text-xl font-semibold mt-4 mb-2">Images:</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//                 {formData.images.map((image, index) => (
//                   <div key={index} className="relative">
//                     <Image
//                       src={image.imageUrl}
//                       alt={`Image ${index + 1}`}
//                       className="rounded-lg w-full h-auto object-cover"
//                       style={{ aspectRatio: "1 / 1" }}
//                       width={500}
//                       height={300}
//                     />
//                     <button
//                       onClick={() => handleRemoveImage(index)}
//                       className="absolute top-2 right-2 bg-red-500 text-white">
//                       <MdDeleteForever />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <>
//               <p className="text-gray-700 mb-2">
//                 <strong>Name:</strong> {data?.name}
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Type:</strong> {data?.category.name}
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Electricity fee:</strong> {data?.electricityFee}/month
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Water fee:</strong> {data?.waterFee} NTD/month
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Gas fee:</strong> {data?.gasFee} NTD/month
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Description:</strong> {data?.description}
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>
//                   {data?.category.name} price for{" "}
//                   {data?.numberOfTenantsByRoomRate} people:
//                 </strong>{" "}
//                 {data?.price} NTD/month
//               </p>
//               <p className="text-gray-700 mb-2">
//                 <strong>Address:</strong> {data?.address}
//               </p>
//               <h2 className="text-xl font-semibold mt-4 mb-2">Status:</h2>
//               <p className="text-gray-700">{data?.status?.description}</p>
//               <h2 className="text-xl font-semibold mt-4 mb-2">Images:</h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//                 {data?.image && data.image.length > 0 ? (
//                   data.image.map((image: ImageType) => (
//                     <Image
//                       key={image.id}
//                       src={`${IMG_URL}/${image.imageUrl}`}
//                       alt={data.name}
//                       className="rounded-lg w-full h-auto object-cover"
//                       style={{ aspectRatio: "1 / 1" }}
//                       width={500}
//                       height={300}
//                     />
//                   ))
//                 ) : (
//                   <p>No images available</p>
//                 )}
//               </div>
//             </>
//           )}
//         </div>
//         <div className="flex justify-between mt-4">
//           <Button onClick={() => router.push("/pages/findAround")}>
//             Find other
//           </Button>
//         </div>
//       </div>
//       <div className="bg-white shadow-lg rounded-lg p-6">
//         <BookingForm roomId={houseId} />
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;


import styles from "../../../../../styles/DetailCard.module.css";
import { useParams } from "next/navigation";
import Skeleton from "@/component/Skeleton";

const ProductDetail: React.FC<ProductDetailProps> = ({ params }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Product | null>(null);
  const router = useRouter();
  const fetchProductData = useCallback(async () => {
    try {
      const response = await axios.get<Product>(
        `${productApiPath.getProductById}/${params.id}`
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching product data:", error);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    document.title = "Product Detail | xinchao";
    fetchProductData();
  }, [params.id, fetchProductData]);

  if (loading)
    return (
      <div className="relative loader-overlay justify-items-center items-center">
        <Skeleton />

        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div className="loader"></div>
        </div>
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles["image-grid"]}>
          {data?.image && data.image.length > 0 ? (
            data.image.map((image: ImageType) => (
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

        <div className={styles["card-info"]}>
          <p className={styles["text-title"]}>{data?.name}</p>
          <p className={styles["text-body"]}>{data?.description}</p>
          <p className={styles["text-body"]}>Type: {data?.category?.name}</p>
          <p className={styles["text-body"]}>
            Electricity Fee: {data?.electricityFee}
          </p>
          <p className={styles["text-body"]}>Water Fee: {data?.waterFee}</p>
          <p className={styles["text-body"]}>Gas Fee: {data?.gasFee}</p>
          <p className={styles["text-body"]}>Address: {data?.address}</p>
          <p className={styles["text-body"]}>
            {data?.category.name} price for {data?.numberOfTenantsByRoomRate}{" "}
            people
          </p>
        </div>
        <div className={styles["card-footer"]}>
          <span className={styles["text-title"]}>Price: {data?.price}</span>
          <button className={styles["cssbuttons-io-button"]} onClick={() => router.push(`/pages/product/schedule-viewing/${params.id}`)}>
            Go check home
            <div className={styles["icon"]}>
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                  fill="currentColor"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
