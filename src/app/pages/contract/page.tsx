"use client";

import React, { useRef, useState, useEffect } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@headlessui/react";
import "../../../styles/globals.css";
import PrintButton from "@/component/PrintButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { contractApiPath } from "@/utils/apiPath";
import { fetchData } from "@/service/api";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Product } from "../../../service/interfaces/Product";
import PrintableTemplate from "@/component/PrintableTemplate";
import "../../../styles/contract.css";
import Image from "next/image";
import Modal from "@/component/user/ModalPayContractFee";


interface FormData {
  userId: string;
  identificationCardIds: string;
  phone: string;
  identificationId: string;
  lessor: string;
  renter: string;
  rentTimeFrom: string;
  rentTimeTo: string;
  productId: string;
  productType: string;
  equipmentProvidedByTheLessor: string;
  numberOfRenter: string;
  rentFee: string;
  dayOfPayRentFee: string;
  electricityFee: string;
  waterFee: string;
  tenancyDeposit: string;
  regulations: string;
  agree: boolean;
  signatureId: string;
}

const defaultProductData: Product = {
  id: "",
  name: "Unknown",
  type: "Unknown",
  description: "No description",
  status: { id: 0, name: "Unknown", description: "Unknown" }, // Giá trị mặc định cho Status
  price: 0,
  electricityFee: "0",
  waterFee: "0",
  gasFee: "0",
  address: "No address",
  imageUrl: [], // Giá trị mặc định cho mảng Image
  author: null,
};

const RentalForm: React.FC = () => {
  const signatureRef = useRef<SignatureCanvas>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormData>({
    userId: "",
    identificationCardIds: "",
    phone: "",
    identificationId: "",
    lessor: "",
    renter: "",
    rentTimeFrom: "",
    rentTimeTo: "",
    productId: "",
    productType: "",
    equipmentProvidedByTheLessor: "",
    numberOfRenter: "",
    rentFee: "",
    dayOfPayRentFee: "",
    electricityFee: "",
    waterFee: "",
    tenancyDeposit: "",
    regulations: "",
    agree: false,
    signatureId: "",
  });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [productData, setProductData] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      setFormData((prevData) => ({
        ...prevData,
        userId: userId,
      }));
    }

    const product = searchParams.get("product");
    if (product) {
      try {
        const decodedProduct = decodeURIComponent(product);
        const parsedProduct = JSON.parse(decodedProduct);
        setProductData(parsedProduct);
        setFormData((prevData) => ({
          ...prevData,
          productId: parsedProduct.id,
          productType: parsedProduct.type,
          rentFee: parsedProduct.price.toString(),
          tenancyDeposit: (parsedProduct.price * 2).toString(),
        }));
      } catch (error) {
        console.error("Error parsing product data:", error);
      }
    } else {
      console.log("Product query parameter is missing");
    }
  }, [searchParams]);


  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "rentTimeFrom") {
      const fromDate = new Date(value);
      const dayOfMonth = fromDate.getDate();
      const toDate = new Date(
        fromDate.getFullYear() + 1,
        fromDate.getMonth(),
        fromDate.getDate()
      );
      const formattedToDate = toDate.toISOString().slice(0, 10); // Định dạng ngày thành chuỗi "YYYY-MM-DD"
      setFormData((prevData) => ({
        ...prevData,
        dayOfPayRentFee: dayOfMonth.toString(),
        rentTimeTo: formattedToDate,
      }));
    }
  };

  const handleClearSignature = () => {
    signatureRef.current?.clear();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(files);

      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newImageFiles);
    setImagePreviews(newImagePreviews);
  };

  const generateRandomFileName = (originalName: string): string => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = originalName.split(".").pop();
    return `${randomString}IdentificationCard.${fileExtension}`;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (signatureRef.current) {
      const signatureData = signatureRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");

      // Convert dataURL to Blob
      const response = await fetch(signatureData);
      const blob = await response.blob();

      // Create a FormData object
      const formDataToSend = new FormData();
      formDataToSend.append("files", blob, `signature-${Date.now()}.png`);

      try {
        // Upload the signature image
        const uploadResponse = await fetchData(
          contractApiPath.uploadSignatureImage,
          {
            method: "POST",
            body: formDataToSend,
          }
        );

        const uploadData = await uploadResponse;
        const signatureImgId = uploadData[0].id;

        // Upload identification cards
        const formDataImages = new FormData();
        imageFiles.forEach((file) => {
          const randomFileName = generateRandomFileName(file.name);
          const renamedFile = new File([file], randomFileName, {
            type: file.type,
          });
          formDataImages.append("files", renamedFile);
        });

        const responseImages = await fetchData(
          contractApiPath.uploadIdentificationCards,
          {
            method: "POST",
            body: formDataImages,
          }
        );

        const dataImages = await responseImages;
        console.log("Upload dataImages:", dataImages);

        const imageIds = dataImages.map((image: any) => image.id);

        const updatedFormData = {
          ...formData,
          identificationCardIds: imageIds,
          signatureId: signatureImgId, // Cập nhật với ID của hình ảnh chữ ký
        };

        // Create contract with all data
        await createContract(updatedFormData);
      } catch (error) {
        toast.error("Failed to submit the form!", {
          position: "top-center",
          autoClose: 2000,
        });
        console.error("Error submitting form:", error);
      }
    } else {
      toast.error("Please provide a signature!", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  const createContract = async (contractData: FormData) => {
    try {
      const response = await fetchData(contractApiPath.createContract, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contractData),
      });

      const data = await response;
      toast.success("Contract created successfully!", {
        position: "top-center",
        autoClose: 2000,
      });
      router.push("/pages/home");
    } catch (error) {
      toast.error("Failed to create contract!", {
        position: "top-center",
        autoClose: 2000,
      });
      console.error("Error creating contract:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    handleSubmit();
  };

  return (
    <>
      <form className="max-w-4xl mx-auto p-4 space-y-4">
        <ToastContainer />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Renter (please! typing your real name)
            </label>
            <input
              type="text"
              name="renter"
              value={formData.renter}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Identification id
            </label>
            <input
              type="text"
              name="identificationId"
              value={formData.identificationId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number Of Renter
            </label>
            <input
              type="number"
              name="numberOfRenter"
              value={formData.numberOfRenter}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rent Time From
            </label>
            <input
              type="date"
              name="rentTimeFrom"
              value={formData.rentTimeFrom}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3"
              max={formData.rentTimeTo}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rent Time To
            </label>
            <input
              type="date"
              name="rentTimeTo"
              value={formData.rentTimeTo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3"
              min={formData.rentTimeFrom}
              readOnly
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product name
            </label>
            <div className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3">
              {productData?.name}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Type
            </label>
            <div className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3">
              {formData.productType}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rent Fee
            </label>
            <div className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3">
              {formData.rentFee}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tenancy Deposit
            </label>
            <div className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3">
              {formData.tenancyDeposit}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Day Of Pay Rent Fee
            </label>
            <input
              type="text"
              name="dayOfPayRentFee"
              value={formData.dayOfPayRentFee}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 pl-3"
              readOnly
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Regulations
          </label>
          <div className="info-container">
            <a>
              Hợp đồng chưa hết hạn và hai bên không được phép chấm dứt hợp đồng
              khi chưa được chấp thuận của đối phương.
            </a>
            <a>
              Nếu vi phạm một trong chín điều sau đây bên cho thuê sẽ không đồng
              ý cho Bên thuê ở tiếp và lập tức yêu cầu bên thuê rời đi và sẽ
              không hoàn lại tiền cọc
            </a>
            <a>
              1. Trong thời gian hợp đồng thuê, bên thuê không được phép vi phạm
              pháp luật, không được tụ tập đánh bạc dưới mọi hình thức hay lập
              sòng bạc, không được hành nghề mại dâm.
            </a>
            <a>
              2. Giữ vệ sinh chung, Không được ồn ào to tiếng làm ảnh hưởng hàng
              xóm
            </a>
            <a>3. Số lượng người ở không đúng với số người đã đăng ký </a>
            <a>4. Nếu thêm người phải báo với cty </a>
            <a>
              5. Vào và ra khỏi nhà và phòng phải tắt công tắc đèn hoặc đóng cửa
            </a>
            <a>6. Cty gửi line bắt buộc phải xem và trả lời cty </a>
            <a>
              7. Cty cho bạn thuê bạn không được tự tiện cho người khác thuê nếu
              bạn cho người khác thuê bạn phải báo với cty
            </a>
            <a>
              8. Nếu bạn chậm quá 15 ngày cty sẽ kết thúc hợp đồng và không cho
              bạn thuê nữa
            </a>
            <a>
              9. Trong nhà không được hút thuốc dễ sảy ra cháy nếu bạn muốn hút
              thì ra ngoài hút
            </a>
          </div>
        </div>
        <div className="flex items-center">
          <input
            id="agree"
            name="agree"
            type="checkbox"
            checked={formData.agree}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
            I agree to the terms and conditions
          </label>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Identification Cards (please! upload front and back of the
            identification card)
          </label>
          <button
            type="button"
            onClick={() => document.getElementById("fileInput")?.click()}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 bg-blue-500 text-white">
            Select Files
          </button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-full h-40 object-cover rounded-md"
                  width={500}
                  height={300}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Signature
          </label>
          <div className="mt-1 border-gray-300 border-2 rounded-md">
            <SignatureCanvas
              ref={signatureRef}
              penColor="black"
              canvasProps={{
                className: "w-full h-40",
                style: { border: "1px solid #D1D5DB" },
              }}
            />
            <div className="flex justify-center space-x-4 mt-2">
              <Button
                onClick={handleClearSignature}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500">
                Clear Signature
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={openModal}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            Submit
          </Button>
        </div>
      </form>

      <Modal
        isOpen={isModalOpen}
        closeModal={closeModal}
        handleConfirm={handleConfirm}
        productData={productData || defaultProductData}
      />
    </>
  );
};

export default RentalForm;
