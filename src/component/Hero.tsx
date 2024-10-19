import Link from "next/link";
import ScrollReveal from "../component/ScrollReveal";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Hero.module.css";

export default function Hero() {
  const t = useTranslations("Hero");
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center py-20 bg-gradient-to-b from-purple-900 to-gray-900">
      <ScrollReveal>
        <div className="flex-1 text-left p-4">
          <h1 className="text-5xl font-bold text-white mb-4 max-w-lg">
            {t("Make life in Taiwan easier and convenient")}
          </h1>
          <p className="text-gray-300 mb-8 max-w-md">{t("description")}</p>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div
          className={`flex-1 p-4 ${styles.perspective}`}
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}>
          <div
            className={`relative w-96 h-80 transform transition-transform duration-700 ${
              isFlipped ? styles["rotate-y-180"] : ""
            } ${styles["preserve-3d"]}`}>
            {/* Mặt trước */}
            <div className={`absolute inset-0 ${styles["backface-hidden"]}`}>
              <Image
                src="/heroImage.jpg" 
                alt="Hero Image"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>

            {/* Mặt sau */}
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
      </ScrollReveal>
    </section>
  );
}
