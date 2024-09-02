"use client";

// Import useState và useEffect từ react
import { useState, useEffect } from "react";
// Import các component và icon từ thư viện
import Image from "next/image";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import Link from "next/link";

const navigation = [
  { name: "Home", href: "/pages/home" },
  { name: "About", href: "/pages/about" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [activeTab, setActiveTab] = useState(navigation[0].name);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const router = useRouter();
  const pathname = usePathname(); // Lấy đường dẫn hiện tại

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") ?? "";
    const savedUsername = localStorage.getItem("username") ?? "";
    setUsername(savedUsername);
    setUserRole(role);

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleTabClick = (name: string) => {
    setActiveTab(name);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const handleTabAdmin = () => {
    router.push("/admin/home");
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            {/* <div className='flex flex-shrink-0 items-center'>
              <img
                alt='Your Company'
                src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                className='h-8 w-auto'
              />
            </div> */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {/* Mapping các mục trong navigation */}
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleTabClick(item.name)} // Truyền href vào hàm xử lý tab
                    className={classNames(
                      // Kiểm tra xem mục nào được chọn để highlight
                      item.name === activeTab
                        ? "bg-sky-500 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {/* Kiểm tra nếu đã đăng nhập thì hiển thị notifications và user menu */}
          {isLoggedIn && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {/* Button notifications */}
              {(userRole === "ADMIN" || userRole === "SUPER_ADMIN") && (
                <button
                  className="bg-sky-500 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded mr-4"
                  onClick={handleTabAdmin}>
                  Admin
                </button>
              )}
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Dropdown của user */}
              <Menu as="div" className="relative ml-3">
                <div>
                  {/* Button để mở dropdown */}
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    {/* Ảnh đại diện của user */}
                    <Image
                      alt="User Avatar"
                      src="/logo.jpg"
                      className="h-8 w-8 rounded-full"
                      width={32} // Nếu bạn muốn tối ưu hóa kích thước ảnh
                      height={32} // Đặt width/height phù hợp với kích thước thật sự
                    />
                  </MenuButton>
                </div>

                {/* Các mục trong dropdown */}
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                  <MenuItem>
                    {/* Các mục khác trong dropdown */}
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                      Settings
                    </a>
                  </MenuItem>
                  <MenuItem>
                    {/* Button logout */}
                    <a
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                      onClick={handleLogout}>
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
              <span className="block px-4 py-2 text-sm text-white">
                Xin Chao {username}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Phần panel cho responsive */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {/* Mapping các mục trong navigation cho responsive */}
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              onClick={() => handleTabClick(item.name)} // Truyền href vào hàm xử lý tab
              className={classNames(
                // Kiểm tra xem mục nào được chọn để highlight
                item.name === activeTab
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}>
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
