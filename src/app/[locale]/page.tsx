"use client";

import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import "../../styles/globals.css";

const HomePage = () => {
  const router = useRouter();
  const t = useTranslations("LandingPage");
  const locale = useLocale();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleChangeLanguage = (lang: string) => {
    // Nếu ngôn ngữ hiện tại khác với ngôn ngữ đã chọn, chuyển đổi ngôn ngữ
    if (locale !== lang) {

      router.push(`${lang}`); // Thêm locale vào URL
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold text-gray-800">{t("appName")}</h1>
          <div className="flex items-center space-x-4">
            <div>
              <select
                onChange={(e) => handleChangeLanguage(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
                defaultValue={locale} // Đặt ngôn ngữ mặc định theo locale hiện tại
              >
                <option value="vn">Tiếng Việt</option>
                <option value="en">English</option>
                <option value="zh">中文</option>
              </select>
            </div>
            <button
              onClick={() => handleNavigation("/login")}
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">
              {t("login")}
            </button>
            <button
              onClick={() => handleNavigation("/register")}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
              {t("register")}
            </button>
          </div>
        </div>
      </header>

      <main className="flex items-center justify-center flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            {t("title")}
          </h2>
          <p className="mb-4 text-gray-600">{t("description")}</p>
        </div>
      </main>

      <footer className="bg-gray-200 p-4 text-center">
        <p className="text-gray-600">{t("footerText")}</p>
      </footer>
    </div>
  );
};

export default HomePage;
