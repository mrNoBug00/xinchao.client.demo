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

const Header: React.FC = () => {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

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
            Dashboard
          </Link>
          <Link
            href="/admin/booking"
            className={`text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center ${
              pathname === "/admin/booking" ? "bg-gray-700" : ""
            }`}>
            <FaCalendarAlt className="mr-2" />
            Booking House
          </Link>
          <Link
            href="/admin/for-rent"
            className={`text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center ${
              pathname === "/admin/for-rent" ? "bg-gray-700" : ""
            }`}>
            <FaBuilding className="mr-2" />
            For Rent
          </Link>
          <Link
            href="/admin/rented"
            className={`text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center ${
              pathname === "/admin/rented" ? "bg-gray-700" : ""
            }`}>
            <FaCheckCircle className="mr-2" />
            Rented
          </Link>
          <Link
            href="/admin/contract"
            className={`text-white hover:bg-gray-700 px-3 py-2 rounded flex items-center ${
              pathname === "/admin/contract" ? "bg-gray-700" : ""
            }`}>
            <FaFileContract className="mr-2" />
            Contract
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
