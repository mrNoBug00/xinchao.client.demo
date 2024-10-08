import Image from "next/image";
import ScrollReveal from "../component/ScrollReveal";

export default function ProductInfo() {
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
    <section className="py-20 bg-gray-900">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Core product
              </h2>
              <p className="text-gray-400">
                Our company has over{" "}
                <span className="font-bold text-primary">
                  100+ houses and rooms for rent throughout Taichung
                </span>
                . In the future, we aim to expand our presence across Taiwan to
                serve all foreigners living in the country.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Reasonable prices
              </h2>
              <p className="text-gray-400">
                We always provide products and services at the best prices in
                the market.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-gradient-to-r from-blue-300  to-purple-300   p-6 rounded-lg shadow-lg flex flex-col justify-between">
              <div className="flex items-start space-x-4 mb-4">
                <Image
                  src="/placeholder.svg"
                  alt="James"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-bold text-primary-foreground">James</h3>
                  <p className="text-primary-foreground/80 text-sm">Founder</p>
                </div>
              </div>
              <p className="text-primary-foreground">
                XinChao will assist foreigners living, studying, and working in
                Taiwan in easily finding a suitable house or room that matches
                their personal preferences and budget.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-span-2">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Available rental locations
              </h2>
              <p className="text-gray-400 mb-4">
                We are always searching for the best living locations for our
                customers.
              </p>
              <div className="flex flex-wrap gap-2">
                {locations.map((location, index) => (
                  <span
                    key={index}
                    className="bg-gray-500 text-sm text-purple-300 px-3 py-1 rounded-full">
                    {location}
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