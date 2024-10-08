

import ScrollReveal from "../component/ScrollReveal";



export default function Features() {
  const features = [
    {
      title: "Services",
      description: "All services comply with legal regulations.",
    },
    {
      title: "Diversity",
      description:
        "We offer a wide range of services to make your life more convenient.",
    },
    {
      title: "Personalization",
      description:
        "You can customize services to your preferences or personal style.",
    },
    {
      title: "Product",
      description:
        "We offer a wide range of products and services for you to choose from.",
    },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl text-white">✦</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
