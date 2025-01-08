import React from "react";
import Image from "next/image";

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

interface ScheduledProps {
  deposits: Deposit[];
}

const Scheduled: React.FC<ScheduledProps> = ({ deposits }) => {
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
                {deposit.product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {deposit.product.price}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {deposit.createAt}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {deposit.contactImage.map((image, index) => (
                  <Image
                    key={index}
                    src={`/public/products/${image.imageUrl}`}
                    alt="Contact Image"
                    className="object-cover rounded-full"
                    width={100}
                    height={100}
                  />
                ))}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {deposit.receiptImage.map((image, index) => (
                  <Image
                    key={index}
                    src={`/public/products/${image.imageUrl}`}
                    alt="Receipt Image"
                    className="object-cover rounded-full"
                    width={100}
                    height={100}
                  />
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scheduled;
