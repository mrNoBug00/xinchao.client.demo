import Image from "next/image";
import ScrollReveal from "../component/ScrollReveal";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";


export default function ProductInfo() {

   const t = useTranslations("ProductInfo");
  const locations = [
    "North District",
    "South District",
    "West District",
    "East District",
    "Nantun District",
    "Xitun District",
    "Taiping District",
    "Dali District",
    "Wuri District",
    "Fengyuan District",
    "Shalu District",
    "Longjing District",
    "Wuqi District",
    "Qingshui District",
    "Daya District",
  ];

  return (
    <section className="py-20 bg-[#f5f1e6] ">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-span-2 transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {t("CoreProduct")}
              </h2>
              <p className="text-gray-400">
                {t("Our company has over")}{" "}
                <span className="font-bold text-primary">
                  {t("CoreProductDesc")}
                </span>
                {t("In the future")}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {t("ReasonablePrices")}
              </h2>
              <p className="text-gray-400">{t("ReasonablePricesDesc")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-gradient-to-r from-blue-300  to-purple-300   p-6 rounded-lg shadow-lg flex flex-col justify-between transition-transform transform hover:scale-105">
              <div className="flex items-start space-x-4 mb-4 ">
                <Image
                  src="/avatar3.jpg"
                  alt="James"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-bold text-primary-foreground">James</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {t("Founder")}
                  </p>
                </div>
              </div>
              <p className="text-primary-foreground">{t("FounderDesc")}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-span-2 transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {t("AvailableRentalLocations")}
              </h2>
              <p className="text-gray-400 mb-4">
                {t("AvailableRentalLocationsDesc")}
              </p>
              <div className="overflow-hidden mt-4">
                <motion.div
                  className="flex flex-nowrap gap-4"
                  animate={{
                    x: [0, -2000],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}>
                  {[...locations, ...locations].map((location, index) => (
                    <motion.div
                      key={index}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full whitespace-nowrap"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.2,
                        duration: 0.5,
                      }}>
                      {t(location)}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
