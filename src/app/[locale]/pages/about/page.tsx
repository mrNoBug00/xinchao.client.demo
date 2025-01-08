"use client";

import { useEffect } from "react";
import "../../../../styles/globals.css";
import Image from "next/image";

const About: React.FC = () => {
  useEffect(() => {
    document.title = "About | xinchao";
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900 mb-40">
      <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
        <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
           About page
          </h2>
          
        </div>
        
      </div>
    </section>
  );
};

export default About;
