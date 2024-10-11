import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function Header() {
  const router = useRouter();
  const t = useTranslations("LandingPageHeader");
  const locale = useLocale();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleChangeLanguage = (lang: string) => {
    if (locale !== lang) {
      router.push(`${lang}`); // Thêm locale vào URL
    }
  };

  return (
    <header className="bg-purple-900 shadow-md ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        <h1 className="text-xl font-bold text-white">{t("appName")}</h1>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div>
            <select
              onChange={(e) => handleChangeLanguage(e.target.value)}
              className="border border-gray-300 rounded-md p-2 bg-white text-gray-800"
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
  );
}
