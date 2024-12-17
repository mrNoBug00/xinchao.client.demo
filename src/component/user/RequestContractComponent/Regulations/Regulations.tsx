import React, { useEffect, useState } from "react";
import { fetchData } from "../../../../service/api"; // Điều chỉnh đường dẫn nếu cần
import { regulationsApiPath } from "@/utils/apiPath";

interface RegulationsProps {
  formData?: {
    regulations: string;
    agree: boolean;
  };
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}


const Regulations: React.FC<RegulationsProps> = ({
  formData,
  handleChange,
}) => {
  const [regulationList, setRegulationList] = useState<any[]>([]); // State để lưu danh sách regulations

  
  // Hàm gọi API để lấy regulations
  useEffect(() => {
    const fetchRegulations = async () => {
      try {
        const data = await fetchData(regulationsApiPath.getRegulations); // Sử dụng hàm fetchData để gọi API
        setRegulationList(data); // Lưu dữ liệu regulations vào state
      } catch (error) {
        console.error("Error fetching regulations:", error);
      }
    };

    fetchRegulations();
  }, []); // Chạy 1 lần khi component được mount

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-3xl border border-gray-300 rounded-md p-6 bg-white shadow-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Regulations
        </label>

        <div className="mt-2 mb-4">
          <ul className="list-disc pl-5 space-y-2">
            {regulationList.map((regulation) => (
              <li key={regulation.id} className="text-sm">
                {regulation.content}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center mt-4">
          <input
            id="agree"
            name="agree"
            type="checkbox"
            checked={formData?.agree}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
          <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
            I agree to the terms and conditions
          </label>
        </div>
      </div>
    </div>
  );
};

export default Regulations;
