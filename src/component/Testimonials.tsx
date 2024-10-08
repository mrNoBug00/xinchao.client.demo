import ScrollReveal from "../component/ScrollReveal";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Nguyen Van Thinh",
      comment:
        "A beautiful, spacious, and airy house, located near the market with all necessary amenities nearby.",
    },
    {
      name: "Tran Thi Lan",
      comment:
        "A beautiful, spacious room with a clean kitchen at a reasonable price.",
    },
    {
      name: "Le Thi Nam Phuong",
      comment:
        "A spacious room surrounded by all necessary amenities, fully equipped with essential items, and offered at a reasonable price.",
    },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-white text-center mb-12">
            Loved by rent people
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between h-full">
                <p className="text-gray-400 mb-4">{testimonial.comment}</p>
                <p className="text-white font-semibold mt-auto">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
