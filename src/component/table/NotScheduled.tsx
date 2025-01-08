import { IMG_URL } from "@/service/api";
import React, { useState } from "react";
import Image from "next/image";
import Button from "./Button";
import DownloadImageCard from "../DownloadImageCard";

interface Deposit {
  id: string;
  name: string;
  phone: string;
  product: {
    name: string;
    price: number;
  };
  createAt: string;
  contactImage: Array<{ imageUrl: string }>;
  receiptImage: Array<{ imageUrl: string }>;
}

interface NotScheduledProps {
  deposits: Deposit[];
}

const NotScheduled: React.FC<NotScheduledProps> = ({ deposits }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageName, setImageName] = useState<string>("");

  const handleImageClick = (imageUrl: string, deposit: Deposit, type: string) => {
    const name = `${deposit.name}-${deposit.product?.name}-${type}`;
    setSelectedImage(imageUrl);
    setImageName(name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false); // Đóng modal
    setImageName("");
    setSelectedImage(null); // Xóa hình ảnh đã chọn
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Phone
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Product
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Price
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Created At
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Contact Image
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Receipt Image
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Rchedule An Appointment
            </th>
          </tr>
        </thead>
        <tbody>
          {deposits.map((deposit) => (
            <tr key={deposit.id}>
              <td className="border border-gray-300 px-4 py-2">
                {deposit.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {deposit.phone}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {deposit.product?.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {deposit.product?.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {deposit?.createAt}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <div className="flex space-x-2">
                  {deposit.contactImage.map((image, index) => (
                    <Image
                      key={index}
                      src={`${IMG_URL}/${image.imageUrl}`}
                      alt="Contact Image"
                      width={48}
                      height={48}
                      className="cursor-pointer"
                      onClick={() =>
                        handleImageClick(
                          `${IMG_URL}/${image.imageUrl}`,
                          deposit,
                          "Contact"
                        )
                      }
                    />
                  ))}
                </div>
              </td>

              <td className="border border-gray-300 px-4 py-2">
                <div className="flex space-x-2">
                  {deposit.receiptImage.map((image, index) => (
                    <Image
                      key={index}
                      src={`${IMG_URL}/${image.imageUrl}`}
                      alt="Receipt Image"
                      width={48}
                      height={48}
                      className="cursor-pointer"
                      onClick={() =>
                        handleImageClick(
                          `${IMG_URL}/${image.imageUrl}`,
                          deposit,
                          "Receipt"
                        )
                      }
                    />
                  ))}
                </div>
              </td>
              <td className="border border-gray-300 px-4 py-2 justify-items-center">
                <Button />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="relative p-6 rounded-2xl shadow-lg bor">
            <DownloadImageCard
              imageUrl={selectedImage}
              imageName={imageName}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotScheduled;
