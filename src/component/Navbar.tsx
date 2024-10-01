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
import { appWithTranslation } from "next-i18next";
import Link from "next/link";
import { useTranslation } from "next-i18next";


const navigation = [
  { name: "Home", href: "/pages/home" },
  { name: "About", href: "/pages/about" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
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
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleTabClick(item.name)}
                    className={classNames(
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
          {isLoggedIn && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
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
                <BellIcon className="h-6 w-6" />
              </button>
              {/* Dropdown user menu code here */}
              <span className="block px-4 py-2 text-sm text-white">
                Xin Chao {username}
              </span>
            </div>
          )}
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              onClick={() => handleTabClick(item.name)}
              className={classNames(
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

export default Navbar