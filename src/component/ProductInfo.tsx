import Image from "next/image";
import ScrollReveal from "../component/ScrollReveal";
import { useTranslations } from "next-intl";

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
    <section className="py-20 bg-gradient-to-b to-gray-900 via-purple-900 from-gray-900">
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
              <div className="flex flex-wrap gap-2">
                {locations.map((location, index) => (
                  <span
                    key={index}
                    className="bg-gray-500 text-sm text-purple-300 px-3 py-1 rounded-full">
                    {t(location)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
