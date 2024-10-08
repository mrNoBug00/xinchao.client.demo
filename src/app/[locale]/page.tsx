"use client";

import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import "../../styles/globals.css";

import Header from "../../component/Header";
import Hero from "../../component/Hero";
import Features from "../../component/Features";
import ProductInfo from "../../component/ProductInfo";
import Testimonials from "../../component/Testimonials";
import Pricing from "../../component/Pricing";
import FAQ from "../../component/FAQ";

const HomePage = () => {
  const t = useTranslations("LandingPage");

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="min-h-screen w-full bg-background">
          <Header />
          <Hero />
          <Features />
          <ProductInfo />
          <Testimonials />
          <Pricing />
          <FAQ />
        </div>
      </main>

      <footer className="bg-gray-900 p-4 text-center">
        <p className="text-gray-600">{t("footerText")}</p>
      </footer>
    </div>
  );
};

export default HomePage;
