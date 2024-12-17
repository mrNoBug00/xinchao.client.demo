import React, { useEffect, useRef, useState } from "react";

import "./styles.css"; // Import CSS

interface ProductDetailProps {
  productData: any;
  numberOfRenter: number;
  formData: any;
  setFormData: (updatedData: any) => void;
  
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  productData,
  numberOfRenter,
  setFormData,
}) => {
  const extraFee =
    numberOfRenter > productData?.numberOfTenantsByRoomRate
      ? (numberOfRenter - productData.numberOfTenantsByRoomRate) * 500
      : 0;

  const rentFee = productData.price;
  const electricityFee = productData.electricityFee;
  const firstMonthRent = productData.price + extraFee;
  const houseDeposit = firstMonthRent * 2;
  const brokerageFee = firstMonthRent / 2;
  const water = productData.waterFee;
  const total = houseDeposit + brokerageFee + firstMonthRent + water;

  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      rentFee: firstMonthRent,
      waterFee: water,
      tenancyDeposit: houseDeposit,
      electricityFee: electricityFee
    }));
  }, [firstMonthRent, water, houseDeposit, setFormData]);



  return (
    <div className="h-screen p-4 rounded-md info-container">
      <h2 className="section-heading">Product details & Payment required</h2>

      {/* Wrapper để hiển thị 2 phần nằm ngang */}
      <div className="flex flex-col sm:flex-row gap-6 ">
        {/* Detail Section */}
        <div className="detail-section flex-1 basis-1/4 min-w-[350px] border border-gray-300 rounded-md p-6 info-box">
          <h3 className="text-md font-semibold mb-4">Product Details</h3>
          <p>Product name: {productData?.name}</p>
          <p className="flex items-center">
            Rent price: {rentFee}
            {numberOfRenter >= productData?.numberOfTenantsByRoomRate && (
              <span className="ml-2">
                + {extraFee} = {firstMonthRent}
              </span>
            )}
          </p>

          {numberOfRenter >= productData?.numberOfTenantsByRoomRate && (
            <span className="text-xs text-red-500">
              The above price is for {numberOfRenter} people.
            </span>
          )}
          <p>
            Maximum number of tenants: {productData?.numberOfTenantsByRoomRate}
          </p>
          <p>Electricity Fee: {productData?.electricityFee}</p>
          <p>Water Fee: {productData?.waterFee}</p>
        </div>

        {/* Payment Section */}
        <div className="payment-section flex-1 basis-1/4 min-w-[350px] border border-gray-300 rounded-md p-6 info-box">
          <h3 className="text-md font-semibold mb-4">Payment</h3>
          <p>House deposit: {houseDeposit}</p>
          <p>Brokerage fee: {brokerageFee}</p>
          <p>First month rent: {firstMonthRent}</p>
          <p>Water Fee: {water}</p>
          <p>Total: {total}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
