import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { fetchData } from "../../service/api"; // Đảm bảo đường dẫn đúng
import { houseApiPath } from "@/utils/admin/apiPath";
import { Booking } from "@/service/interfaces/Booking";

const BookingChart = () => {
  const [data, setData] = useState<
    {
      month: string;
      confirmed: number;
      canceled: number;
      refused: number;
      total: number;
    }[]
  >([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings: Booking[] = await fetchData(houseApiPath.getAllBooking);

        const monthlyData: {
          [key: string]: {
            confirmed: number;
            canceled: number;
            refused: number;
          };
        } = {};

        bookings.forEach((booking) => {
          const bookingDate = new Date(...booking.bookingTime);
          const year = bookingDate.getFullYear();
          const month = bookingDate.getMonth();
          const key = `${year}-${month}`;

          if (!monthlyData[key]) {
            monthlyData[key] = { confirmed: 0, canceled: 0, refused: 0 };
          }

          switch (booking.status.name) {
            case "CONFIRMED":
              monthlyData[key].confirmed += 1;
              break;
            case "CANCEL":
              monthlyData[key].canceled += 1;
              break;
            case "REFUSE":
              monthlyData[key].refused += 1;
              break;
            default:
              break;
          }
        });

        const chartData = Object.entries(monthlyData).map(([key, value]) => {
          const [year, month] = key.split("-");
          const total = value.confirmed + value.canceled + value.refused;
          return {
            month: `${month}/${year}`,
            confirmed: value.confirmed,
            canceled: value.canceled,
            refused: value.refused,
            total,
          };
        });

        chartData.sort((a, b) => {
          const [monthA, yearA] = a.month.split("/").map(Number);
          const [monthB, yearB] = b.month.split("/").map(Number);
          return yearA === yearB ? monthA - monthB : yearA - yearB;
        });

        setData(chartData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

    
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "8px",
      }}>
      <h3 style={{ textAlign: "center" }}>Booking Statistics</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="confirmed" stroke="#00ff00" />
          <Line type="monotone" dataKey="canceled" stroke="#ff0000" />
          <Line type="monotone" dataKey="refused" stroke="#ffa500" />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BookingChart;
