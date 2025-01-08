"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("LandingPageHeader");
  const locale = useLocale();
  const path = "/";

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleChangeLanguage = (lang: string) => {
    if (locale !== lang) {
      router.push(`/${lang}`);
    }
    setIsDropdownOpen(false);
  };

  const isActive = (path: string) => {
    const currentPath = pathname?.replace(/^\/[a-z]{2}/, "") || "/";
    if (path === "/") {
      return currentPath === "/";
    }

    if (path === "/pages/product") {
      return currentPath.startsWith("/pages/product");
    }

    return currentPath === path;
  };



  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <button onClick={() => router.push("/")}>
              <Image
                src="/logo.jpg"
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </button>
          </div>

          {/* Center Desktop Menu */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <Link
                href={`/`}
                className={`text-gray-700 hover:text-blue-600 relative pb-2 ${
                  isActive(path) ? "text-blue-600" : ""
                }`}>
                {t("Home")}
                {isActive(path) && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#f6e9d5] transition-all duration-300"></div>
                )}
              </Link>
              <Link
                href="/pages/product"
                className={`text-gray-700 hover:text-blue-600 relative pb-2 ${
                  isActive("/pages/product") ? "text-blue-600" : ""
                }`}>
                {t("Product")}
                {isActive("/pages/product") && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#f6e9d5] transition-all duration-300"></div>
                )}
              </Link>
              <Link
                href="/pages/about"
                className={`text-gray-700 hover:text-blue-600 relative pb-2 ${
                  isActive("/pages/about") ? "text-blue-600" : ""
                }`}>
                {t("About")}
                {isActive("/pages/about") && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#f6e9d5] transition-all duration-300"></div>
                )}
              </Link>
              <Link
                href="/pages/contact"
                className={`text-gray-700 hover:text-blue-600 relative pb-2 ${
                  isActive("/pages/contact") ? "text-blue-600" : ""
                }`}>
                {t("Contact")}
                {isActive("/pages/contact") && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-[#f6e9d5] transition-all duration-300"></div>
                )}
              </Link>
            </div>
          </div>

          {/* Desktop Right Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2">
                <Image
                  src={`/${locale}.png`}
                  alt={locale}
                  width={44}
                  height={16}
                />
                <svg
                  className="w-4 h-4 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg py-1 z-50">
                  {["vn", "en", "zh"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleChangeLanguage(lang)}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-orange-600">
                      <Image
                        src={`/${lang}.png`}
                        alt={lang}
                        width={44}
                        height={16}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons / User Menu */}
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 hover:text-orange-600">
                  <BsPersonCircle />
                  <span className="text-gray-700">{username}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {(userRole === "ADMIN" || userRole === "SUPER_ADMIN") && (
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-600"
                        onClick={() => router.push("/admin/home")}>
                        {t("AdminDashboard")}
                      </button>
                    )}
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-600">
                      {t("Profile")}
                    </button>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-600">
                      {t("Settings")}
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-orange-600">
                      {t("Logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => router.push("/login")}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  {t("login")}
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                  {t("register")}
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600">
              <Image
                src="/bars-3-bottom-right.svg"
                alt="Menu"
                width={32}
                height={8}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600">
              {t("Home")}
            </Link>
            <Link
              href="/pages/product"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600">
              {t("Product")}
            </Link>
            <Link
              href="/pages/about"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600">
              {t("About")}
            </Link>
            <Link
              href="/pages/contact"
              className="block px-3 py-2 text-gray-700 hover:text-orange-600">
              {t("Contact")}
            </Link>

            {/* Language Selector Mobile */}
            <div className="px-3 py-2">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2">
                <Image
                  src={`/${locale}.png`}
                  alt={locale}
                  width={32}
                  height={8}
                />
                <span>{t("Language")}</span>
              </button>
              {isDropdownOpen && (
                <div className="mt-2 space-y-1">
                  {["vn", "en", "zh"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleChangeLanguage(lang)}
                      className="flex items-center w-full px-2 py-1 text-sm text-gray-700 hover:bg-gray-100">
                      <Image
                        src={`/${lang}.png`}
                        alt={lang}
                        width={32}
                        height={8}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons Mobile */}
            {isLoggedIn ? (
              <div className="px-3 py-2 space-y-1 border-t border-gray-200">
                <div className="flex items-center mb-4">
                  <BsPersonCircle className="h-6 w-6" />
                  <span className="ml-3 text-base font-medium text-gray-700">
                    {username}
                  </span>
                </div>
                <button
                  onClick={() => {
                    /* handle profile click */
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">
                  {t("Profile")}
                </button>
                <button
                  onClick={() => {
                    /* handle settings click */
                  }}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">
                  {t("Settings")}
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-50">
                  {t("Logout")}
                </button>
              </div>
            ) : (
              <div className="px-3 py-2 space-y-1">
                <button
                  onClick={() => router.push("/login")}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  {t("login")}
                </button>
                <button
                  onClick={() => router.push("/register")}
                  className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                  {t("register")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
