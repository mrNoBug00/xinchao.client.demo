"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import "../../../../styles/globals.css";
import Image from "next/image";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { AiOutlineWechat } from "react-icons/ai";
import SellerCard from "@/component/SellerCard";
import ButtonGoToMap from "@/component/ButtonGoToMap";
import { sellers } from "@/data/sellersData";
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  const t = useTranslations("Contact");

  const address = "台中市潭子區雅潭路三段88號";
  const center = {
    lat: 24.2095, // Tanzi District coordinates
    lng: 120.7051,
  };

  const addressLocation = {
    lat: 24.2095,
    lng: 120.7051,
  };

  return (
    <section className="bg-[#f5f1e6] py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-center mb-16 ">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("ContactUs")}
          </h1>
          <p className="text-lg text-gray-600">{t("GetInTouch")}</p>
        </div>

        {/* Sellers Grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {sellers.map((seller) => (
            <SellerCard
              key={seller.id}
              avatarUrl={seller.avatarUrl}
              name={seller.name}
              phone={seller.phone}
              lineId={seller.lineId}
              lineQrCode={seller.lineQrCode}
              zalo={seller.zalo}
              zaloQrCode={seller.zaloQrCode}
            />
          ))}
        </div> */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#f6e9d5] rounded-lg shadow-lg p-8">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("Name")}
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("Email")}
                </label>
                <input
                  type="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  {t("Message")}
                </label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                {t("Send")}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-[#f6e9d5] rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t("ContactInfo")}
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <FaPhone className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">{t("Phone")}</h3>
                  <p className="text-gray-600">0989507518</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <AiOutlineWechat className="text-blue-600 text-3xl mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">Line ID</h3>
                  <p className="text-gray-600">@416ztseb</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <FaEnvelope className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">{t("Email")}</h3>
                  <p className="text-gray-600">xinchao@example.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 ">
                <FaMapMarkerAlt className="text-blue-600 text-xl mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">
                    {t("OfficeAddress")}
                  </h3>
                  <div className="flex items-start space-x-8">
                    <p className="text-gray-600">台中市潭子區雅潭路三段88號</p>
                    <ButtonGoToMap />
                  </div>
                </div>
              </div>
            </div>

            {/* Line Qr code */}
            <div className="mt-8 h-64 rounded-lg overflow-hidden">
              <Image
                src="/lineQR.png"
                alt="lineQR"
                width={200}
                height={200}
                className="object-cover"
              />
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
              zoom={15}
              center={center}>
              <Marker position={addressLocation} title={address}>
                <InfoWindow position={addressLocation}>
                  <div className="p-2">
                    <p className="text-sm font-medium">{address}</p>
                  </div>
                </InfoWindow>
              </Marker>
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </section>
  );
};

const mapContainerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "8px",
  marginTop: "2rem",
};

export default Contact;
