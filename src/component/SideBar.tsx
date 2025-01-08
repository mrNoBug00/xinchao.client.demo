// src/components/Header.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaCalendarAlt,
  FaBuilding,
  FaCheckCircle,
} from "react-icons/fa";
import { FaFileContract } from "react-icons/fa6";
import { useTranslations } from "next-intl";
import { AiFillDollarCircle } from "react-icons/ai";

const SideBar: React.FC = () => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại
  const t = useTranslations("AdminSidebar");

  return (
    <header className="bg-gray-800 p-4 rounded-lg">
      <div className="container mx-auto flex flex-col space-y-2">
        <nav>
          <Link
            href="/admin/home"
            className={`text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center ${
              pathname === "/admin/home" || pathname === "/admin/addNewProduct"
                ? "bg-gray-700"
                : ""
            }`}>
            <FaHome className="mr-2" /> {/* Icon */}
            {t("Dashboard")}
          </Link>
          <Link
            href="/admin/booking"
            className={`text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center ${
              pathname === "/admin/booking" ? "bg-gray-700" : ""
            }`}>
            <FaCalendarAlt className="mr-2" />
            {t("Booking House")}
          </Link>
          <Link
            href="/admin/deposit-to-hold"
            className={`text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center ${
              pathname === "/admin/booking" ? "bg-gray-700" : ""
            }`}>
            <AiFillDollarCircle className="mr-2" />
            {t("Deposit To Hold")}
          </Link>
          <Link
            href="/admin/for-rent"
            className={`text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center ${
              pathname === "/admin/for-rent" ? "bg-gray-700" : ""
            }`}>
            <FaBuilding className="mr-2" />
            {t("For Rent")}
          </Link>
          <Link
            href="/admin/rented"
            className={`text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center ${
              pathname === "/admin/rented" ? "bg-gray-700" : ""
            }`}>
            <FaCheckCircle className="mr-2" />
            {t("Rented")}
          </Link>
          <Link
            href="/admin/contract"
            className={`text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center ${
              pathname === "/admin/contract" ? "bg-gray-700" : ""
            }`}>
            <FaFileContract className="mr-2" />
            {t("Contract")}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default SideBar;
