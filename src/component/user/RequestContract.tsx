"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Button } from "@headlessui/react";
import "../../../styles/globals.css";
import PrintButton from "@/component/PrintButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface FormData {
  userId: string;
  identificationCardIds: string;
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
  signature: string;
}

const RentalForm: React.FC = () => {
  const signatureRef = useRef<SignatureCanvas>(null);
  const [formData, setFormData] = useState<FormData>({
    userId: "",
    identificationCardIds: "",
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
    signature: "",
  });

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
      const toDate = new Date(
        fromDate.getFullYear() + 1,
        fromDate.getMonth(),
        fromDate.getDate()
      );
      const formattedToDate = toDate.toISOString().slice(0, 10); // Định dạng ngày thành chuỗi "YYYY-MM-DD"
      setFormData((prevData) => ({
        ...prevData,
        rentTimeTo: formattedToDate,
      }));
    }
  };

  const handleClearSignature = () => {
    signatureRef.current?.clear();
  };

  const handleSaveSignature = () => {
    if (signatureRef.current) {
      const signatureData = signatureRef.current
        .getTrimmedCanvas()
        .toDataURL("image/png");
      setFormData((prev) => ({
        ...prev,
        signature: signatureData,
      }));
      toast.success("saved!", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Xử lý gửi dữ liệu form
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-4 space-y-4">
      <ToastContainer />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            User ID
          </label>
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Identification Card IDs
          </label>
          <input
            type="text"
            name="identificationCardIds"
            value={formData.identificationCardIds}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter IDs separated by commas"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Lessor
          </label>
          <input
            type="text"
            name="lessor"
            value={formData.lessor}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Renter
          </label>
          <input
            type="text"
            name="renter"
            value={formData.renter}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            min={formData.rentTimeFrom}
            readOnly
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product ID
          </label>
          <input
            type="text"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Type
          </label>
          <input
            type="text"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Equipment Provided By The Lessor
        </label>
        <textarea
          name="equipmentProvidedByTheLessor"
          value={formData.equipmentProvidedByTheLessor}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Number Of Renter
          </label>
          <input
            type="number"
            name="numberOfRenter"
            value={formData.numberOfRenter}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rent Fee
          </label>
          <input
            type="number"
            name="rentFee"
            value={formData.rentFee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Day Of Pay Rent Fee
          </label>
          <input
            type="number"
            name="dayOfPayRentFee"
            value={formData.dayOfPayRentFee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Electricity Fee
          </label>
          <input
            type="text"
            name="electricityFee"
            value={formData.electricityFee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Water Fee
          </label>
          <input
            type="text"
            name="waterFee"
            value={formData.waterFee}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tenancy Deposit
          </label>
          <input
            type="number"
            name="tenancyDeposit"
            value={formData.tenancyDeposit}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Regulations
        </label>
        <textarea
          name="regulations"
          value={formData.regulations}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
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
            <Button
              onClick={handleSaveSignature}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
              Save Signature
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-end">
        <PrintButton formData={formData} />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RentalForm;
