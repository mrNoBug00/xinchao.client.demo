import ScrollReveal from "../component/ScrollReveal";
import { useTranslations } from "next-intl";


export default function FAQ() {

  const t = useTranslations("FAQ");

  const faqs = [
    {
      question: "What fees do I have to pay when signing a rental agreement?",
      answer:
        "The fees that customers need to pay when renting a house are a two-month security deposit, one month of rent, and a one-month brokerage fee",
    },
    {
      question: "How long can I sign the contract for?",
      answer:
        "The minimum rental period is 6 months, and the maximum is one year Upon expiration, if the customer wishes to continue renting, they can sign a new contract",
    },
    {
      question:
        "How will the utility costs be calculated when renting a house or room?",
      answer:
        "Utility costs will be calculated based on the meter or according to the contract terms If the customer rents a room, the cost will be divided equally among the tenants For houses, the tenant is responsible for all utility costs",
    },
    {
      question:
        "What identification documents are required when renting a house or a room?",
      answer:
        "When renting a house or room, customers need to provide their passport, ARC (Alien Resident Certificate), or other relevant ID card, passport, or Government ID card of the guarantor",
    },
  ];

  return (
    <section className="py-20" id="faq">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-[#162b75] text-center mb-12">
            {t("title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t(faq.question)}
                </h3>
                <p className="text-gray-400">{t(faq.answer)}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
