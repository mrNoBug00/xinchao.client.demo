'use client';

import { useRouter } from 'next/navigation';
import '../../styles/globals.css'
import { useTranslations } from "next-intl";

const HomePage = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const t = useTranslations("LangdingPage");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">{t("title")}</h1>
        <div className="space-y-4">
          <button
            onClick={() => handleNavigation("/login")}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">
            {t("login")}
          </button>
          <button
            onClick={() => handleNavigation("/register")}
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-300">
            {t("register")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
