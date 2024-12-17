"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import CompanyInfo from "@/component/user/RequestContractComponent/CompanyInfo/CompanyInfo";
import CustomerInfo from "@/component/user/RequestContractComponent/CustomerInfo/CustomerInfo";
import ProductDetail from "@/component/user/RequestContractComponent/ProductDetail/ProductDetail";
import Regulations from "@/component/user/RequestContractComponent/Regulations/Regulations";
import Signature from "@/component/user/RequestContractComponent/Signature/Signature";
import GuarantorInfo from "@/component/user/RequestContractComponent/GuarantorInfo/GuarantorInfo";
import UploadImage from "@/component/user/RequestContractComponent/UploadImage/UploadImage";
import "@/styles/globals.css";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { fetchData } from "../../../../service/api";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { contractApiPath } from "@/utils/apiPath";
const RentalForm: React.FC = () => {
  const router = useRouter();
  const signatureRef = useRef<SignatureCanvas>(null);
  const [currentStep, setCurrentStep] = useState(0); // Quản lý bước hiện tại
  const [formData, setFormData] = useState({
    numberOfRenter: "",
    rentTimeFrom: "",
    rentTimeTo: "",
    agree: false,
    companyId: "",
    userId: "",
    customerName: "",
    customerIdentificationCardIds: [],
    customerIdentificationId: "",
    customerPhone: "",
    customerLine: "",
    customerZalo: "",
    guarantorName: "",
    guarantorPhone: "",
    guarantorLine: "",
    guarantorZalo: "",
    productId: "",
    productType: "",
    equipmentProvidedByTheLessor: "",
    rentFee: "",
    dayOfPayRentFee: "",
    electricityFee: "",
    waterFee: "",
    tenancyDeposit: "",
    signatureId: "",
    regulationsId: [],
  });

  const [productData, setProductData] = useState<any>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const searchParams = useSearchParams();
  const product = searchParams.get("product");

  const userId = localStorage.getItem("userId");
  const [isSigned, setIsSigned] = useState(false);

  const handleClearSignature = () => {
    signatureRef.current?.clear();
    setIsSigned(false); // Đặt lại trạng thái nếu người dùng xóa chữ ký
  };

  const handleSignatureChange = () => {
    if (signatureRef.current && !signatureRef.current.isEmpty()) {
      setIsSigned(true); // Đánh dấu là đã ký
    }
  };

  useEffect(() => {
    setProductData(JSON.parse(decodeURIComponent(product as string)));
    console.log(productData);

    if (product) {
      try {
        const decodedProduct = decodeURIComponent(product);
        const parsedProduct = JSON.parse(decodedProduct);

        setProductData(parsedProduct);
        console.log("productData.companyInfo.id:", parsedProduct.companyInfo);
      } catch (error) {
        console.error("Error parsing product data:", error);
      }
    } else {
      console.log("Product query parameter is missing");
    }
  }, []);

  useEffect(() => {
    if (currentStep === steps.length - 1) {
      handleSignatureChange();
    }
  }, [currentStep]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, type, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" && e.target instanceof HTMLInputElement
          ? e.target.checked
          : e.target.value,
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

  const handleNext = () => {
    if (currentStep === 4 && !formData.agree) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Hàm quay lại bước trước
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const uploadImages = async (imageFiles: File[]) => {
    try {
      const formData = new FormData();
      imageFiles.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetchData(contractApiPath.uploadSignatureImage, {
        method: "POST",
        body: formData,
      });

      if (response && Array.isArray(response) && response.length > 0) {
        return response.map((image: any) => image.id);
      } else {
        console.error("Không có dữ liệu ảnh trong phản hồi:", response);
        return [];
      }
    } catch (error) {
      console.error("Lỗi khi tải ảnh:", error);
      return [];
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Upload ảnh trước khi gửi hợp đồng
    const customerIdentificationCardIds = await uploadImages(imageFiles);
    const signatureDataUrl = signatureRef.current?.toDataURL();

    let signatureId = "";

    if (signatureDataUrl) {
      // Tạo đối tượng File từ DataURL
      const signatureBlob = await fetch(signatureDataUrl).then((res) =>
        res.blob()
      );
      const signatureFile = new File([signatureBlob], "signature.png", {
        type: "image/png",
      });

      // Upload ảnh chữ ký
      const uploadedSignatureIds = await uploadImages([signatureFile]);
      if (uploadedSignatureIds.length > 0) {
        signatureId = uploadedSignatureIds[0]; // Lấy ID của chữ ký vừa tải lên
      }
    } else {
      console.log("Chữ ký không hợp lệ");
    }

    
    // 2. Chuẩn bị dữ liệu hợp đồng
    const contractData = {
      companyId: productData.companyInfo.id,
      userId: userId,
      customerName: formData.customerName,
      customerIdentificationCardIds: customerIdentificationCardIds,
      customerIdentificationId: formData.customerIdentificationId,
      customerPhone: formData.customerPhone,
      customerLine: formData.customerLine,
      customerZalo: formData.customerZalo,
      rentTimeFrom: formData.rentTimeFrom,
      rentTimeTo: formData.rentTimeTo,
      guarantorName: formData.guarantorName,
      guarantorPhone: formData.guarantorPhone,
      guarantorLine: formData.guarantorLine,
      guarantorZalo: formData.guarantorZalo,
      productId: productData.id,
      productType: productData.type,
      equipmentProvidedByTheLessor: formData.equipmentProvidedByTheLessor,
      numberOfRenter: formData.numberOfRenter,
      rentFee: formData.rentFee,
      dayOfPayRentFee: formData.dayOfPayRentFee,
      electricityFee: formData.electricityFee,
      waterFee: formData.waterFee,
      tenancyDeposit: formData.tenancyDeposit,
      agree: formData.agree,
      signatureId: signatureId,
      regulationsId: formData.regulationsId,
    };

    // 3. Gửi dữ liệu hợp đồng lên server
    try {
      const response = await fetchData(contractApiPath.createContract, {
        method: "POST",
        body: JSON.stringify(contractData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Product added successfully!", {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => {
        router.push("/pages/home");
      }, 2000);
      console.log("Contract created successfully:", response);
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };

  // Danh sách các bước của form
  const steps = [
    <CompanyInfo key="companyInfo" />,

    <CustomerInfo
      key="customerInfo"
      formData={formData}
      handleChange={handleChange}
    />,
    <GuarantorInfo
      key="guarantorInfo"
      formData={formData}
      handleChange={handleChange}
    />,
    <ProductDetail
      key="productDetail"
      numberOfRenter={parseInt(formData.numberOfRenter, 10) || 0}
      productData={productData}
      formData={formData}
      setFormData={setFormData}
    />,
    <Regulations key="regulations" handleChange={handleChange} />,
    <UploadImage
      key="uploadImage"
      imageFiles={imageFiles}
      setImageFiles={setImageFiles}
    />,
    <Signature
      key="signature"
      signatureRef={signatureRef}
      handleClearSignature={handleClearSignature}
      handleSignatureChange={handleSignatureChange}
    />,
  ];

  return (
    <form className=" flex flex-col justify-between bg-white rounded-lg shadow-lg">
      <ToastContainer />
      <div className="flex-1">{steps[currentStep]}</div>

      {/* Nút điều hướng */}
      <div className="flex flex-row justify-center space-x-4 m-6">
        {currentStep > 0 && (
          <button
            type="button"
            onClick={handlePrevious}
            className="bg-gray-300 text-black py-2 px-6 rounded-md hover:bg-gray-400 transition-colors">
            Previous
          </button>
        )}

        <button
          type="button"
          onClick={handleNext}
          hidden={currentStep === steps.length - 1}
          disabled={
            (currentStep === 4 && !formData.agree) ||
            (currentStep === 5 && imageFiles.length < 2)
          }
          className={`${
            currentStep === steps.length - 1 ||
            (currentStep === 4 && !formData.agree) ||
            (currentStep === 5 && imageFiles.length < 2)
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          } py-2 px-6 rounded-md transition-colors`}>
          Next
        </button>

        {currentStep === steps.length - 1 && (
          <button
            type="submit"
            disabled={!isSigned}
            onClick={handleSubmit}
            className={`py-2 px-6 rounded-md transition-colors ${
              isSigned
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-400 text-gray-700 cursor-not-allowed"
            }`}>
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default RentalForm;
