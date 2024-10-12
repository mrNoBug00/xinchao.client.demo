import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const t = useTranslations("LandingPageHeader");
  const locale = useLocale();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State để quản lý menu mobile
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State để quản lý dropdown ngôn ngữ

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleChangeLanguage = (lang: string) => {
    if (locale !== lang) {
      router.push(`/${lang}`); // Thêm locale vào URL
    }
    setIsDropdownOpen(false); // Đóng dropdown sau khi chọn ngôn ngữ
  };

  return (
    <header className="bg-purple-900 shadow-md">
      <div className="container mx-auto flex md:flex-row justify-between items-center p-4">
        <h1 className="text-xl font-bold text-white">{t("appName")}</h1>

        <Image
          src="/bars-3-bottom-right.svg" // Đường dẫn đến biểu tượng
          alt="Menu"
          className="md:hidden cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          width={32}
          height={8}
        />

        {/* Các nút và dropdown cho màn hình lớn - nằm bên phải */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className=" rounded-md  text-gray-800  flex items-center justify-between">
              <span>
                <Image
                  src={`/${locale}.png`}
                  alt={locale}
                  className="mr-2"
                  width={64}
                  height={16}
                />
              </span>
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 10l5 5 5-5H7z"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 z-50 w-20">
                <button
                  onClick={() => handleChangeLanguage("vn")}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100">
                  <Image src="/vn.png" alt="Vietnam" width={64} height={16} />{" "}
                </button>
                <button
                  onClick={() => handleChangeLanguage("en")}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100">
                  <Image src="/en.png" alt="English" width={64} height={16} />{" "}
                </button>
                <button
                  onClick={() => handleChangeLanguage("zh")}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100">
                  <Image src="/zh.png" alt="Chinese" width={64} height={16} />{" "}
                </button>
              </div>
            )}
          </div>
          <button
            onClick={() => handleNavigation("/login")}
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full max-w-[180px]">
            {t("login")}
          </button>
          <button
            onClick={() => handleNavigation("/register")}
            className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 w-full max-w-[180px]">
            {t("register")}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="absolute right-4 mt-2 bg-white shadow-lg rounded-md p-4 z-50 md:hidden">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="border border-gray-300 rounded-md p-2 bg-white text-gray-800 w-full flex items-center justify-between">
              <span>
                <Image
                  src={`/${locale}.png`}
                  alt={locale}
                  className="mr-2"
                  width={32}
                  height={8}
                />
              </span>
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 10l5 5 5-5H7z"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md  z-50">
                <button
                  onClick={() => handleChangeLanguage("vn")}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100">
                  <Image src="/vn.png" alt="Vietnam" width={32} height={8} />{" "}
                </button>
                <button
                  onClick={() => handleChangeLanguage("en")}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100">
                  <Image src="/en.png" alt="Vietnam" width={32} height={8} />{" "}
                </button>
                <button
                  onClick={() => handleChangeLanguage("zh")}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-100">
                  <Image src="/zh.png" alt="Vietnam" width={32} height={8} />{" "}
                </button>
              </div>
            )}
            <button
              onClick={() => handleNavigation("/login")}
              className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 w-full">
              {t("login")}
            </button>
            <button
              onClick={() => handleNavigation("/register")}
              className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300 w-full">
              {t("register")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
