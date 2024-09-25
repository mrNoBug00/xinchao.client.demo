import axios from "axios";
import { houseApiPath } from "@/utils/admin/apiPath";

export const refuseBooking = async (bookingId: string, message: string) => {
  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("userId");

  return await axios.put(
    `${houseApiPath.refuseBooking}/refuse`,
    { adminId, bookingId, message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const cancelBooking = async (bookingId: string, message: string) => {
  const token = localStorage.getItem("token");
  const adminId = localStorage.getItem("userId");
  return await axios.put(
    `${houseApiPath.cancelBooking}/cancel`,
    { adminId, bookingId, message },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
