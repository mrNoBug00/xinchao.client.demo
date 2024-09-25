import { houseApiPath } from "@/utils/admin/apiPath";
import axios from "axios";

export const confirmBooking = async (bookingId: string, message: string) => {
  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("userId");

  const requestData = {
    adminId: adminId, // lấy adminId từ localStorage
    bookingId: bookingId, // truyền bookingId từ tham số
    message: message || "", // thêm message tùy chọn nếu cần
  };

  try {
    await axios.put(`${houseApiPath.comfirmBooking}/confirm`, requestData, {
      headers: {
        Authorization: `Bearer ${token}`, // Thêm token vào header
      },
    });
    return { success: true, message: "Booking confirmed successfully!" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error confirming booking:",
        error.response?.data || error.message
      );
      return { success: false, message: "Failed to confirm booking" };
    } else {
      console.error("Unexpected error:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};
