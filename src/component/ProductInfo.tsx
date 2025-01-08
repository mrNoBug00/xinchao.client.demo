import Image from "next/image";
import ScrollReveal from "../component/ScrollReveal";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";

export default function ProductInfo() {

   const t = useTranslations("ProductInfo");
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

const locationCoordinates = [
  { name: "North District", lat: 24.1565, lng: 120.6839 },
  { name: "South District", lat: 24.1332, lng: 120.6647 },
  { name: "West District", lat: 24.1492, lng: 120.6641 },
  { name: "East District", lat: 24.1371, lng: 120.6947 },
  { name: "Nantun District", lat: 24.1488, lng: 120.6465 },
  { name: "Xitun District", lat: 24.1811, lng: 120.6274 },
  { name: "Taiping District", lat: 24.1265, lng: 120.7184 },
  { name: "Dali District", lat: 24.0906, lng: 120.6778 },
  { name: "Wuri District", lat: 24.0995, lng: 120.6247 },
  { name: "Fengyuan District", lat: 24.2545, lng: 120.7218 },
  { name: "Shalu District", lat: 24.2356, lng: 120.5651 },
  { name: "Longjing District", lat: 24.2324, lng: 120.4868 },
  { name: "Wuqi District", lat: 24.2647, lng: 120.5217 },
  { name: "Qingshui District", lat: 24.2687, lng: 120.566 },
  { name: "Daya District", lat: 24.2206, lng: 120.7884 },
];

  const center = {
    lat: 24.1477, // Taichung center
    lng: 120.6736,
  };

  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  return (
    <section className="py-20 bg-[#f5f1e6] ">
      <ScrollReveal>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-span-2 transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {t("CoreProduct")}
              </h2>
              <p className="text-gray-400">
                {t("Our company has over")}{" "}
                <span className="font-bold text-orange-400">
                  {t("CoreProductDesc")}
                </span>
                {t("In the future")}
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {t("ReasonablePrices")}
              </h2>
              <p className="text-gray-400">{t("ReasonablePricesDesc")}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="bg-gradient-to-r from-blue-300  to-purple-300   p-6 rounded-lg shadow-lg flex flex-col justify-between transition-transform transform hover:scale-105">
              <div className="flex items-start space-x-4 mb-4 ">
                <Image
                  src="/avatar3.jpg"
                  alt="James"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-bold text-primary-foreground">James</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {t("Founder")}
                  </p>
                </div>
              </div>
              <p className="text-primary-foreground">{t("FounderDesc")}</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg md:col-span-2 transition-transform transform hover:scale-105">
              <h2 className="text-2xl font-bold mb-4 text-white">
                {t("AvailableRentalLocations")}
              </h2>
              <p className="text-gray-400 mb-4">
                {t("AvailableRentalLocationsDesc")}
              </p>
              <div className="overflow-hidden mt-4">
                <motion.div
                  className="flex flex-nowrap gap-4"
                  animate={{
                    x: [0, -2000],
                  }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}>
                  {[...locations, ...locations].map((location, index) => (
                    <motion.div
                      key={index}
                      className="bg-blue-500 text-white px-4 py-2 rounded-full whitespace-nowrap"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.2,
                        duration: 0.5,
                      }}>
                      {t(location)}
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
            <h2 className="text-2xl font-bold mb-4 text-[#162b75]">
              {t("LocationsMap")}
            </h2>
            <LoadScript
              googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
              <GoogleMap
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}>
                {locationCoordinates.map((location, index) => (
                  <Marker
                    key={index}
                    position={{ lat: location.lat, lng: location.lng }}
                    onMouseOver={() => setSelectedLocation(location.name)}
                    onMouseOut={() => setSelectedLocation(null)}>
                    {selectedLocation === location.name && (
                      <InfoWindow
                        position={{ lat: location.lat, lng: location.lng }}
                        onCloseClick={() => setSelectedLocation(null)}>
                        <div className="px-2 py-1 bg-white rounded shadow">
                          <p className="text-sm font-medium text-gray-900">
                            {t(location.name)}
                          </p>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}


const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
  marginTop: "2rem",
};
