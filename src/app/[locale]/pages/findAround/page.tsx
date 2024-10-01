'use client'

import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { fetchData } from "../../../../service/api";
import { productApiPath } from "@/utils/apiPath";
import { geocodeAddress } from "../../../../service/geocode";
import { useRouter } from "next/navigation"; 
import "../../../../styles/globals.css";

const center = {
  lat: 10.762622,
  lng: 106.660172,
};

interface Coordinates {
  lat: number;
  lng: number;
}

interface Product {
  id: number;
  name: string;
  type: string;
  description: string;
  price: number;
  address: string;
  author: string | null;
}

const MapComponent: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  const [productLocations, setProductLocations] = useState<
    (Coordinates & { id: number })[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  const router = useRouter();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  useEffect(() => {
    document.title = "Find | xinchao";

    const fetchAndGeocodeAddresses = async () => {
      try {
        // Lấy vị trí người dùng
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              setUserLocation({ lat: latitude, lng: longitude });
            },
            (error) => {
              console.error("Error getting user location:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }

        // Lấy dữ liệu địa chỉ từ database và geocode thành tọa độ
        const data: Product[] = await fetchData(productApiPath.getAllProducts);
        const coords = await Promise.all(
          data.map(async (product) => {
            const { address, id } = product;
            try {
              const coord = await geocodeAddress(address);
              return { ...coord, id };
            } catch (error) {
              console.error(`Failed to geocode address ${address}:`, error);
              return null;
            }
          })
        );
        const validCoords = coords.filter(
          (coord) => coord !== null
        ) as (Coordinates & { id: number })[];
        setProductLocations(validCoords);
        setLoading(false); // Dữ liệu đã tải xong
      } catch (error) {
        console.error("Error fetching and geocoding addresses:", error);
        setLoading(false); // Xử lý lỗi và dừng trạng thái loading
      }
    };

    fetchAndGeocodeAddresses();
  }, [router]);

  const handleMarkerClick = (id: number) => {
    router.push(`/pages/product/${id}`);
  };

  return (
    <>
      {isLoaded ? (
        <div className="w-full h-screen">
          <GoogleMap
            mapContainerClassName="w-full h-full"
            center={userLocation || center}
            zoom={10}
          >
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  url: "/street-view.svg",
                  scaledSize: new window.google.maps.Size(60, 60),
                }}
                title="Your Location"
              />
            )}

            {productLocations.map((coord) => (
              <Marker
                key={coord.id}
                position={coord}
                onClick={() => handleMarkerClick(coord.id)}
              />
            ))}
          </GoogleMap>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default MapComponent;
