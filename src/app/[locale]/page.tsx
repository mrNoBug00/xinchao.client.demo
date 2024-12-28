"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import "../../styles/globals.css";
import Image from "next/image";

import Header from "../../component/Header";
import Hero from "../../component/Hero";
import Features from "../../component/Features";
import ProductInfo from "../../component/ProductInfo";
import Testimonials from "../../component/Testimonials";
import Pricing from "../../component/Pricing";
import FAQ from "../../component/FAQ";
import ImageCarousel from "../../component/ImageCarousel";
import Navbar from "@/component/Navbar";
import BusinessFeld from "@/component/BusinessField";

const HomePage = () => {
  const t = useTranslations("LandingPageHeader");
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  // document.title = "Landing page | xinchao";
  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout); // Cleanup timeout on component unmount
  }, []); // Empty dependency array ensures this runs only once after initial mount

  if (loading)
    return (
      <div className="loader-overlay">
        <div className="loader"></div>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen bg-[#e8e8e8]">
      <main className="flex-grow flex flex-col items-center justify-center">
        <div className="min-h-screen w-full bg-background">
          <Navbar />
          {/* <Header /> */}

          {/* <Features /> */}

          <Hero />

          <BusinessFeld />
          {/* ImageCarousel */}
          {/* <div className="mt-80">
            <ImageCarousel />
          </div> */}
          {/* <ImageCarousel/> */}
          <ProductInfo />
          <Testimonials />
          <Pricing />
          <FAQ />
        </div>
      </main>

      <footer className="bg-gray-900 p-4 text-center relative">
        <p className="text-gray-600">{t("footerText")}</p>
        {isVisible && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 bg-green-600 text-white py-2 px-4 rounded-full shadow-lg transition-opacity duration-300 flex items-center justify-center hover:bg-purple-400">
            <Image
              src="/chevron-double-up.svg"
              alt="Back to top"
              className="mr-2"
              width={20}
              height={20}
            />
            {t("Back to top")}
          </button>
        )}
      </footer>
    </div>
  );
};

export default HomePage;
