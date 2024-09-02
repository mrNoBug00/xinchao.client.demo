import React, { useEffect, useState } from "react";
import { fetchData } from "../../service/api";
import { contractApiPath } from "../../utils/admin/apiPath";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/globals.css";
import "../../styles/table.css";
import { useRouter } from "next/navigation";

interface Contract {
  id: string;
  identificationId: string;
  phone: string;
  lessor: string;
  renter: string;
  rentTimeFrom: [number, number, number];
  rentTimeTo: [number, number, number];
  product: {
    id: number;
    name: string;
    type: string;
    price: number;
    address: string;
    description: string;
    imageUrl: { id: string; imageUrl: string; imagePath: string }[];
    status: { id: number; name: string; description: string };
  } | null;
  productType: string;
  rentFee: number;
  tenancyDeposit: number;
  status: string;
  createTime: [number, number, number, number, number, number, number];
}

const ContractList: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const router = useRouter();

  useEffect(() => {
    const getContracts = async () => {
      try {
        const fetchedContracts = await fetchData(
          contractApiPath.getAllContract
        );
        const sortedContracts = fetchedContracts.sort(
          (a: Contract, b: Contract) => {
            const dateA = new Date(
              a.createTime[0],
              a.createTime[1] - 1,
              a.createTime[2],
              a.createTime[3],
              a.createTime[4],
              a.createTime[5]
            );
            const dateB = new Date(
              b.createTime[0],
              b.createTime[1] - 1,
              b.createTime[2],
              b.createTime[3],
              b.createTime[4],
              b.createTime[5]
            );
            return dateB.getTime() - dateA.getTime(); // Sắp xếp giảm dần
          }
        );
        setContracts(sortedContracts);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('An unknown error occurred'));
        }
        setLoading(false);
      
      }
    };

    getContracts();
  }, []);

    const handleEdit = async (id: string) => {
      router.push(`/admin/editContract/${id}`);
  };

  const handleDelete = (id: string) => {
    console.log(`Cancel contract with ID: ${id}`);
    // Thực hiện các hành động khác khi người dùng nhấn vào nút "Cancel"
  };

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  const handleCopy = () => {
    toast.success("Copied!", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4 ">
      <ToastContainer />
      <div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 border-b">Identification Id</th>
                <th className="py-3 px-4 border-b">Renter</th>
                {/* <th className="py-3 px-4 border-b">Lessor</th> */}
                <th className="py-3 px-4 border-b">Rent Time From</th>
                <th className="py-3 px-4 border-b">Rent Time To</th>
                <th className="py-3 px-4 border-b">Product Name</th>
                <th className="py-3 px-4 border-b">Create Time</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.id}>
                  <CopyToClipboard
                    text={contract.identificationId}
                    onCopy={handleCopy}>
                    <td
                      className="py-3 px-4 border-b text-center cursor-pointer"
                      title={contract.identificationId}>
                      {truncateText(contract.identificationId, 15)}
                    </td>
                  </CopyToClipboard>
                  <td className="py-3 px-4 border-b text-center">
                    {contract.renter}
                  </td>
                  {/* <td className="py-3 px-4 border-b text-center">
                    {contract.lessor}
                  </td> */}
                  <td className="py-3 px-4 border-b text-center">
                    {contract.rentTimeFrom.join("/")}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {contract.rentTimeTo.join("/")}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {contract.product ? contract.product.name : ""}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {new Date(
                      contract.createTime[0],
                      contract.createTime[1] - 1, // Tháng bắt đầu từ 0
                      contract.createTime[2],
                      contract.createTime[3],
                      contract.createTime[4],
                      contract.createTime[5]
                    ).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {contract.status}
                  </td>
                  <td className="py-3 px-4 border-b text-center space-x-2">
                    <button
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                      onClick={() => handleEdit(contract.id)}>
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                      onClick={() => handleDelete(contract.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContractList;
