// import React from "react";
// import "../styles/ProductBanner.css";
// import Image from "next/image";

// const ProductBanner: React.FC = () => {
//   return (
//     <div className="banner-container">
//       <h1 className="banner-text">PRODUCTS</h1>
//       <Image
//         className="banner-image"
//         src="/ProductBanner.jpg"
//         alt="Product banner"
//         layout="fill"
//         objectFit="cover"
//       />
//     </div>
//   );
// };

// export default ProductBanner;

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface ProductBannerProps {
  title?: string;
  description?: string;
  imageUrl?: string; // Make imageUrl required
  buttonText?: string;
  buttonLink?: string;
}

const defaultProps = {
  title: "Featured Product",
  description: "Discover our amazing products",
  imageUrl: "/heroImage.jpg",
  buttonText: "Learn More",
  buttonLink: "/pages/product",
} as const;

const ProductBanner: React.FC<ProductBannerProps> = ({
  title = defaultProps.title,
  description = defaultProps.description,
  imageUrl = defaultProps.imageUrl,
  buttonText = defaultProps.buttonText,
  buttonLink = defaultProps.buttonLink,
}) => {

  const t = useTranslations("ProductBanner");
  return (
    <div className="relative overflow-hidden bg-[#f5f1e6] rounded-lg">
      <div className="max-w-8xl mx-auto">
        <div className="relative z-10 lg:grid lg:grid-cols-2 lg:gap-8 items-center min-h-[500px]">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-64 sm:h-72 md:h-96 lg:h-full">
            <Image
              src={imageUrl}
              alt={title || ""}
              fill
              className="object-cover shadow-2xl"
              priority
            />
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:ml-8 p-8 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold bg-[#f5f1e6] mb-6">
              {t(title)}
            </h1>
            <p className="text-lg bg-[#f5f1e6] mb-8">{t(description)}</p>
            {/* <Link
              href={buttonLink || defaultProps.buttonLink!}
              className="inline-block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-blue-900 rounded-full font-semibold
                         hover:bg-blue-50 transition-colors duration-300
                         focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                aria-label={`Learn more about ${title}`}>
                {buttonText}
              </motion.button>
            </Link> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductBanner;