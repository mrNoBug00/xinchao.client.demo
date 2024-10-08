
import ScrollReveal from "../component/ScrollReveal";



export default function Pricing() {
  const plans = [
    {
      name: "Room",
      description: "A basic room, suitable for one person.",
      price: "4,000 NTD",
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
      description: "Spacious room with all necessary amenities.",
      price: "6,500 NTD",
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
      description: "Fully furnished, suitable for multiple occupants.",
      price: "25,000 NTD",
      features: [
        "Bathroom",
        "Kitchen",
        "Wifi",
        "Bed",
        "Wardrobe",
        "Car parking space",
        "Air conditioning",
        "Private accommodation",
      ],
    },
  ];

  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-900 to-purple-900"
      id="pricing">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-white text-center mb-12">
            Pricing for service
          </h2>
          <p className="text-center text-gray-300 mb-8">
            One-time payment or monthly payment
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className="bg-gray-800 p-6 rounded-lg flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>{" "}
                {/* Mô tả được thêm vào đây */}
                <p className="text-3xl font-bold text-white mb-6">
                  {plan.price}
                </p>
                <ul className="text-gray-400 mb-6 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="mb-2">
                      <span className="text-green-600">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-purple-600 text-white py-2 rounded mt-auto">
                  Let's go
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-300 mt-8">
            The price above does not include brokerage fees.
          </p>
        </div>
      </ScrollReveal>
    </section>
  );
}
