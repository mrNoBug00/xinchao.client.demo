import axios from "axios";

export const geocodeAddress = async (address: string) => {

      console.log(
        "process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: ",
        process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
      );

  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address,
          key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      }
    );

    
    const { data } = response;
    if (data.status === "OK" && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng };
    } else {
      console.error(
        `Geocoding failed for address: ${address}, status: ${data.status}`
      );
      throw new Error(`Geocoding failed for address: ${address}`);
    }
  } catch (error) {
    console.error("Error geocoding address:", error);
    throw new Error("Geocoding failed");
  }
};
