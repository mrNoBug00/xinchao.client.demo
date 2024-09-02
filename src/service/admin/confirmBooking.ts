import { houseApiPath } from "@/utils/admin/apiPath";
import axios from "axios";


export const confirmBooking = async (bookingId: number) => {
  
    const token = localStorage.getItem("token");
    const adminId = localStorage.getItem("userId");
    console.log(token);
    console.log(adminId);
    

  try {
    await axios.put(
      `${houseApiPath.comfirmBooking}/${bookingId}/confirm`,
      adminId,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Thêm token vào header
        },
      }
    );
    return { success: true, message: "Booking confirm successfully!" };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error confirm booking:",
        error.response?.data || error.message
      );
      return { success: false, message: "Failed to confirm booking" };
    } else {
      // Xử lý các loại lỗi khác nếu cần
      console.error("Unexpected error:", error);
      return { success: false, message: "An unexpected error occurred" };
    }
  }
};
