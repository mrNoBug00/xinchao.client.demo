import Link from "next/link";
import ScrollReveal from "../component/ScrollReveal";


export default function Hero() {
  return (
    <section className="text-center py-20 bg-gradient-to-b from-purple-900 to-gray-900">
      <ScrollReveal>
        <h1 className="text-5xl font-bold text-white mb-4">
          Make life in Taiwan
          <br />
          easier and convenient
        </h1>

        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Our company provides house and room rental services for foreigners
          living, studying, and working in Taiwan. We are committed to providing
          the best service and experience to our customers.
        </p>

        
      </ScrollReveal>
    </section>
  );
}
