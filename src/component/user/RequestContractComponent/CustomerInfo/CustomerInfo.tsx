// components/contract/CustomerInfo.tsx
import React from "react";
import "./styles.css"; // Import CSS

interface CustomerInfoProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="info-container grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="info-box col-span-2">
        <p className="section-heading">Customer</p>
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Identification ID
            </label>
            <input
              type="text"
              name="customerIdentificationId"
              value={formData.customerIdentificationId}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300"
            />
          </div>
        </div>
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Number of people leving in room
            </label>
            <input
              type="text"
              name="numberOfRenter"
              value={formData.numberOfRenter}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rent Time From
            </label>
            <input
              type="date"
              name="rentTimeFrom"
              value={formData.rentTimeFrom}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300"
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
              className="mt-1 block w-full rounded-md border border-gray-300"
            />
          </div>
        </div>
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Line
            </label>
            <input
              type="text"
              name="customerLine"
              value={formData.customerLine}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Zalo
            </label>
            <input
              type="text"
              name="customerZalo"
              value={formData.customerZalo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
