import Link from "next/link";
import ScrollReveal from "../component/ScrollReveal";
import { useTranslations } from "next-intl";


export default function Hero() {

  const t = useTranslations("Hero");


  return (
    <section className="text-center py-20 bg-gradient-to-b from-purple-900 to-gray-900">
      <ScrollReveal>
        <h1 className="text-5xl font-bold text-white mb-4">
          {t("Make life in Taiwan easier and convenient")}

        </h1>

        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          {t("description")}
        </p>
      </ScrollReveal>
    </section>
  );
}
