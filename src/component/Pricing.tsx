
import ScrollReveal from "../component/ScrollReveal";
import { useTranslations } from "next-intl";



export default function Pricing() {

  const t = useTranslations("Pricing");

  const plans = [
    {
      name: "Room",
      description: "A basic room, suitable for one person",
      price: "4,000 NTD",
      isNeedChoose: false,
      features: [
        "Shared bathroom",
        "Shared kitchen",
        "Wifi",
        "Mattress",
        "Wardrobe",
        "Parking space",
      ],
    },
    {
      name: "Room Residence",
      description: "Spacious room with all necessary amenities",
      price: "6,500 NTD",
      isNeedChoose: true,
      features: [
        "En-suite bathroom",
        "Air conditioning",
        "Wifi",
        "Bed",
        "Wardrobe",
        "Parking space",
        "Private accommodation",
      ],
    },
    {
      name: "House",
      description: "Fully furnished, suitable for multiple occupants",
      price: "25,000 NTD",
      isNeedChoose: false,
      features: [
        "Bathroom",
        "Kitchen",
        "Wifi",
        "Bed",
        "Wardrobe",
        "Parking space",
        "Air conditioning",
        "Private accommodation",
      ],
    },
  ];

  return (
    <section
      className="py-20"
      id="pricing">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-black text-center mb-12">
            {t("title")}
          </h2>
          <p className="text-center text-black mb-8">{t("description")}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`bg-gray-800 p-6 rounded-lg flex flex-col ${
                  plan.isNeedChoose ? "border-2 border-green-600" : ""
                } transition-transform transform hover:scale-105`}>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t(plan.name)}
                </h3>
                <p className="text-gray-400 mb-4">{t(plan.description)}</p>{" "}
                {/* Mô tả được thêm vào đây */}
                <p className="text-3xl font-bold text-white mb-6">
                  {plan.price}
                </p>
                <ul className="text-gray-400 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2">
                      <span className="text-green-600">✓</span> {t(feature)}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-purple-600 text-white py-2 rounded mt-auto hover:bg-purple-400">
                  {t("go")}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-black mt-8">{t("note")}</p>
        </div>
      </ScrollReveal>
    </section>
  );
}
