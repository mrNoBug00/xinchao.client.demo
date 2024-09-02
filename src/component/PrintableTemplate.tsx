import React, { forwardRef } from "react";
import Image from "next/image";
import {
  PrintableTemplateProps,
} from "../service/interfaces/Print";




const PrintableTemplate: React.ForwardRefRenderFunction<
  HTMLDivElement,
  PrintableTemplateProps
> = ({ formData }, ref) => {
  // Kiểm tra xem imagePreviews có phải là mảng không
  const imagePreviews = Array.isArray(formData.imagePreviews)
    ? formData.imagePreviews
    : []; // Nếu không phải mảng, khởi tạo là mảng rỗng

  // Kiểm tra xem identificationCardIds có phải là mảng không
  const identificationCardIds = Array.isArray(formData.identificationCardIds)
    ? formData.identificationCardIds
    : [formData.identificationCardIds];

  return (
    <div
      ref={ref}
      className="p-4 border border-gray-300 rounded-md"
      id="printable-area">
      <h2 className="text-lg font-semibold">HỢP ĐỒNG THUÊ NHÀ</h2>
      <div className="mt-4">
        <p>
          <span className="font-medium">BÊN CHO THUÊ (Bên A):</span>
        </p>
        <p>
          <span className="font-medium">Ông: 立慶資產管理顧問股份有限公司</span>
        </p>
        <p>
          <span className="font-medium">MST số: 91048432</span>
        </p>
        <p>
          <span className="font-medium">
            Nơi ĐKTT: 台中市潭子區中山路二段198號2F
          </span>
        </p>
        <p>
          <span className="font-medium">Line ID: @416ztseb</span>
        </p>

        <p>
          <span className="font-medium">BÊN THUÊ (Bên B):</span>
        </p>
        <p>
          <span className="font-medium">Renter:</span> {formData.renter}
        </p>
        <p>
          <span className="font-medium">Phone:</span> {formData.phone}
        </p>
        <p>
          <span className="font-medium">Identification id:</span>{" "}
          {formData.identificationId}
        </p>
        <p>
          <span className="font-medium">Identification Card IDs:</span>{" "}
          {identificationCardIds.join(", ")}
        </p>
        <p>
          <span className="font-medium">Lessor:</span> {formData.lessor}
        </p>

        <p>
          <span className="font-medium">Rent Time From:</span>{" "}
          {formData.rentTimeFrom}
        </p>
        <p>
          <span className="font-medium">Rent Time To:</span>{" "}
          {formData.rentTimeTo}
        </p>
        <p>
          <span className="font-medium">Product name:</span>{" "}
          {formData.productName}
        </p>
        <p>
          <span className="font-medium">Product Type:</span>{" "}
          {formData.productType}
        </p>
        <p>
          <span className="font-medium">Equipment Provided By The Lessor:</span>{" "}
          {formData.equipmentProvidedByTheLessor}
        </p>
        <p>
          <span className="font-medium">Number Of Renter:</span>{" "}
          {formData.numberOfRenter}
        </p>
        <p>
          <span className="font-medium">Rent Fee:</span> {formData.rentFee}
        </p>
        <p>
          <span className="font-medium">Day Of Pay Rent Fee:</span>{" "}
          {formData.dayOfPayRentFee}
        </p>
        <p>
          <span className="font-medium">Electricity Fee:</span>{" "}
          {formData.electricityFee}
        </p>
        <p>
          <span className="font-medium">Water Fee:</span> {formData.waterFee}
        </p>
        <p>
          <span className="font-medium">Tenancy Deposit:</span>{" "}
          {formData.tenancyDeposit}
        </p>
        <p>
          <span className="font-medium">Regulations:</span>{" "}
          {formData.regulations}
        </p>
        <p>
          <span className="font-medium">Agree to terms and conditions:</span>{" "}
          {formData.agree ? "Yes" : "No"}
        </p>
        <div className="mt-4 border-t pt-4">
          <h3 className="text-lg font-semibold">Signature</h3>
          <div className="mt-2 border border-gray-300 rounded-md">
            <Image
              src={formData.signature}
              alt="Signature"
              width={200}
              height={200}
            />
          </div>
        </div>

        {/* Hiển thị ảnh đã chọn */}
        <div className="image-gallery mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative">
              <Image
                src={preview}
                alt={`Preview ${index}`}
                className="w-full h-40 object-cover rounded-md"
                width={500}
                height={300}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default forwardRef(PrintableTemplate);
