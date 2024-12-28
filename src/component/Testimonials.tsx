import ScrollReveal from "../component/ScrollReveal";
import { useTranslations } from "next-intl";

export default function Testimonials() {

   const t = useTranslations("Testimonials");

  const testimonials = [
    {
      name: "Nguyen Van Thinh",
      comment:
        "A beautiful, spacious, and airy house, located near the market with all necessary amenities nearby",
    },
    {
      name: "Tran Thi Lan",
      comment:
        "A beautiful, spacious room with a clean kitchen at a reasonable price",
    },
    {
      name: "Le Thi Nam Phuong",
      comment:
        "A spacious room surrounded by all necessary amenities, fully equipped with essential items, and offered at a reasonable price",
    },
  ];

  return (
    <section className="py-20 bg-[#f6e9d5]">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-[#162b75] text-center mb-12">
            {t("title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg flex flex-col justify-between h-full transition-transform transform hover:scale-105">
                <p className="text-blackblack mb-4">{t(testimonial.comment)}</p>
                <p className="text-[#162b75] font-semibold mt-auto">
                  {t(testimonial.name)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
