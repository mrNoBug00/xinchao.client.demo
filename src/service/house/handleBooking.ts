import axios from "axios";
import { houseApiPath } from "@/utils/apiPath";

export const createBooking = async (
  userId: string,
  roomId: string,
  bookingTime: string,
  username: string,
  phone: string,
  contactQrCode: string[]
) => {
  const bookingData = {
    userId: userId,
    roomId: roomId,
    bookingTime: bookingTime,
    bookerName: username,
    bookerPhone: phone,
    contactQrCode: contactQrCode,
  };

  const token = localStorage.getItem("token"); // Lấy token từ localStorage

  try {
    await axios.post(houseApiPath.bookingHouse, bookingData, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return { success: true, message: "Booking created successfully!" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error creating booking:",
        error.response?.data || error.message
      );
      return { success: false, message: "Failed to create booking" };
    } else {
      // Xử lý các loại lỗi khác nếu cần
      console.error("Unexpected error:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};

