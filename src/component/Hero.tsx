import Link from "next/link";
import ScrollReveal from "../component/ScrollReveal";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("Hero");

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
        <div className="flex-1 p-4">
          <Image
            src="/heroImage.jpg"
            alt="Hero Image"
            width={600}
            height={500}
            className="rounded-lg object-cover"
          />
        </div>
      </ScrollReveal>
    </section>
  );
}
