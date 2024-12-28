import ScrollReveal from "../component/ScrollReveal";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FaHome, FaBed, FaRecycle } from "react-icons/fa";

export default function BusinessField() {
  const t = useTranslations("BusinessField");
  const router = useRouter();

  const categories = [
    {
      id: 1,
      name: "HOUSE",
      icon: <FaHome className="w-12 h-12 mb-4" />,
      path: "/pages/product/category/HOUSE",
    },
    {
      id: 2,
      name: "ROOM",
      icon: <FaBed className="w-12 h-12 mb-4" />,
      path: "/pages/product/category/ROOM",
    },
    {
      id: 3,
      name: "SECOND-HAND",
      icon: <FaRecycle className="w-12 h-12 mb-4" />,
      path: "/pages/product/category/second-hand",
    },
  ];

  return (
    <section className="pt-5 pb-20 bg-[#f6e9d5]">
      <ScrollReveal>
        <div className="container mx-auto px-4 -mt-16">
          <div className="rounded-lg p-8 bg-[#f6e9d5] shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => router.push(category.path)}
                  className="bg-white p-8 rounded-lg shadow-lg text-center cursor-pointer
                       transition-transform duration-300 hover:scale-105 flex flex-col items-center justify-center h-full">
                  {category.icon}
                  <h3 className="text-lg font-semibold text-[#162b75]">
                    {category.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-xl font-semibold text-[#162b75] text-center mt-16">
            {t("title")}
          </h2>
        </div>
      </ScrollReveal>
    </section>
  );
}
