// components/contract/CustomerInfo.tsx
import React from "react";
import "./styles.css"; // Import CSS

interface GuarantorInfoProps {
  formData: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

const GuarantorInfo: React.FC<GuarantorInfoProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="h-screen info-container grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="info-box col-span-2">
        <label>Guarantor</label>
        <div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="guarantorName"
              value={formData.guarantorName}
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
              name="guarantorIdentificationId"
              value={formData.guarantorIdentificationId}
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
              name="guarantorPhone"
              value={formData.guarantorPhone}
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
              name="guarantorLine"
              value={formData.guarantorLine}
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
              name="guarantorZalo"
              value={formData.guarantorZalo}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuarantorInfo;
