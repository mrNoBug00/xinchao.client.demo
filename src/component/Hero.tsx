import Link from "next/link";
import ScrollReveal from "../component/ScrollReveal";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Hero.module.css";

export default function Hero() {
  const t = useTranslations("Hero");

 return (
   <section className="relative flex flex-col md:flex-row items-center justify-center">
     {/* Hình ảnh Hero */}
     <div className="relative w-full h-[800px]">
       <div className="absolute inset-0">
         <Image
           src="/living-room-8403277_1920.jpg"
           alt="Hero Image"
           layout="fill"
           objectFit="cover"
         />
       </div>

       {/* Lớp phủ màu */}
       <div className="absolute inset-0 bg-black opacity-50"></div>
     </div>

     {/* Nội dung văn bản */}
     <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10">
       <ScrollReveal>
         <div>
           <h1 className="text-5xl font-bold text-white mb-4 max-w-4xl">
             {t("Make life in Taiwan easier and convenient")}
           </h1>
           {/* <p className="mb-8 max-w-3xl text-white">{t("description")}</p> */}
         </div>
       </ScrollReveal>
     </div>
   </section>
 );



}

{
  /* <ScrollReveal>
          <div
            className={`flex-1 p-4 ${styles.perspective}`}
            onMouseEnter={() => setIsFlipped(true)}
            onMouseLeave={() => setIsFlipped(false)}>
            <div
              className={`relative w-96 h-80 transform transition-transform duration-700 ${
                isFlipped ? styles["rotate-y-180"] : ""
              } ${styles["preserve-3d"]}`}>
              <div className={`absolute inset-0 ${styles["backface-hidden"]}`}>
                <Image
                  src="/heroImage.jpg"
                  alt="Hero Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>

              <div
                className={`absolute inset-0 ${styles["backface-hidden"]} ${styles["rotate-y-180"]}`}>
                <Image
                  src="/backHeroImage.jpg"
                  alt="Hero Back Image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </ScrollReveal> */
}
