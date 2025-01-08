import Image from "next/image";
import { FaPhone } from "react-icons/fa";
import { SiLine, SiZalo } from "react-icons/si";
import { useTranslations } from "next-intl";

interface SellerCardProps {
  avatarUrl?: string;
  name: string;
  phone: string;
  lineId: string;
  lineQrCode: string;
  zalo: string;
  zaloQrCode: string;
}

const SellerCard = ({
  avatarUrl = "/default-avatar.png",
  name,
  phone,
  lineId,
  lineQrCode,
  zalo,
  zaloQrCode,
}: SellerCardProps) => {
  const t = useTranslations("Contact");

  return (
    <div className="bg-[#f6e9d5] rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ">
      {/* Profile Section */}
      <div className="flex flex-col  items-center mb-6">
        <div className="relative -mt-14 mb-4">
          <Image
            src={avatarUrl}
            alt={`${name}'s avatar`}
            className=" rounded-xl object-cover"
            width={150}
            height={150}
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">{name}</h2>
      </div>

      {/* Contact Info Section */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center space-x-3">
          <FaPhone className="text-blue-600 text-xl" />
          <span className="text-gray-700">{phone}</span>
        </div>
        <div className="flex items-center space-x-3">
          <SiLine className="text-green-600 text-xl" />
          <span className="text-gray-700">Line: {lineId}</span>
        </div>
        <div className="flex items-center space-x-3">
          <SiZalo className="text-blue-600 text-xl" />
          <span className="text-gray-700">Zalo: {zalo}</span>
        </div>
      </div>

      {/* QR Code Section */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4"></h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="relative">
            <Image
              src={lineQrCode}
              alt="Line QR Code"
              className="rounded-lg"
              width={100}
              height={100}
            />
            <span className="text-gray-700">Line QR Code</span>
          </div>
          <div className="relative">
            <Image
              src={zaloQrCode}
              alt="zalo QR Code"
              className="rounded-lg"
              width={100}
              height={100}
            />
            <span className="text-gray-700">Zalo QR Code</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerCard;
