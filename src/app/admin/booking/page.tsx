"use client";

import { useEffect, useState } from "react";
import { fetchData } from "../../../service/api";
import { houseApiPath } from "@/utils/admin/apiPath";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../styles/globals.css";
import "../../../styles/table.css";
import { confirmBooking } from "@/service/admin/confirmBooking";

interface Booking {
  id: number;
  userId: string;
  roomName: string;
  roomAddress: string;
  bookerName: string | null;
  bookerPhone: string | null;
  bookingTime: number[];
  status: string;
  confirmedBy: string | null;
}

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    document.title = "Booking | xinchao";
    const getBookings = async () => {
      try {
        const fetchedBookings = await fetchData(houseApiPath.getAllBooking);
        const sortedBookings = fetchedBookings.sort(
          (a: Booking, b: Booking) => {
            // Tạo đối tượng Date từ mảng bookingTime
            const dateA = new Date(
              a.bookingTime[0], // year
              a.bookingTime[1] - 1, // month (0-indexed)
              a.bookingTime[2], // day
              a.bookingTime[3], // hour
              a.bookingTime[4] // minute
            );
            const dateB = new Date(
              b.bookingTime[0], // year
              b.bookingTime[1] - 1, // month (0-indexed)
              b.bookingTime[2], // day
              b.bookingTime[3], // hour
              b.bookingTime[4] // minute
            );
            return dateB.getTime() - dateA.getTime();
          }
        );
        setBookings(sortedBookings);
        setFilteredBookings(sortedBookings); // Set initial filtered bookings
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    getBookings();
  }, []);

  const handleFilter = () => {
    if (!selectedDate) return;

    const selectedDateTime = new Date(selectedDate); // Tạo đối tượng Date từ selectedDate
    selectedDateTime.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00:00
    const nextDayTime = new Date(selectedDateTime.getTime() + 86400000); // 24 giờ trong milliseconds

    const filtered = bookings.filter((booking) => {
      const bookingDate = new Date(
        booking.bookingTime[0],
        booking.bookingTime[1] - 1, // Trừ 1 cho tháng
        booking.bookingTime[2],
        booking.bookingTime[3],
        booking.bookingTime[4]
      ).getTime();

      return (
        bookingDate >= selectedDateTime.getTime() &&
        bookingDate < nextDayTime.getTime()
      );
    });

    setFilteredBookings(filtered);
  };

  const handleClearFilter = () => {
    setSelectedDate("");
    setFilteredBookings(bookings); // Reset to show all bookings
  };

  const handleAccept = async (id: number) => {
    try {
      await confirmBooking(id); // Xác nhận booking
      // Cập nhật trạng thái booking trong state
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: "CONFIRMED" } : booking
        )
      );
      setFilteredBookings((prevFiltered) =>
        prevFiltered.map((booking) =>
          booking.id === id ? { ...booking, status: "CONFIRMED" } : booking
        )
      );
      toast.success("Accept successfully!", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error("Failed to accept booking.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  const handleCancel = async (id: number) => {
    console.log(`cancel booking with id: ${id}`);
  }
  const handleRefuse = (id: number) => {
    console.log(`Refused booking with id: ${id}`);
  };

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  const handleCopy = () => {
    toast.success("Copied!", {
      position: "top-center",
      autoClose: 1000,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <ToastContainer />
      <h1 className="text-3xl font-bold mb-6">Bookings</h1>
      <div className="mb-4 flex items-center space-x-2">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded p-1"
        />
        <button
          onClick={handleFilter}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
          Filter
        </button>
        <button
          onClick={handleClearFilter}
          className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-700 transition-colors">
          Clear Filter
        </button>
      </div>
      <div>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr className="bg-gray-200">
                <th className="py-3 px-4 border-b">User ID</th>
                <th className="py-3 px-4 border-b">Room/House Name</th>
                <th className="py-3 px-4 border-b">Room/House Address</th>
                <th className="py-3 px-4 border-b">Booker Name</th>
                <th className="py-3 px-4 border-b">Booker Phone</th>
                <th className="py-3 px-4 border-b">Booking Time</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Confirmed By</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <CopyToClipboard text={booking.userId} onCopy={handleCopy}>
                    <td
                      className="py-3 px-4 border-b text-center cursor-pointer"
                      title={booking.userId}>
                      {truncateText(booking.userId, 10)}
                    </td>
                  </CopyToClipboard>
                  <td className="py-3 px-4 border-b text-center">
                    {booking.roomName}
                  </td>
                  <CopyToClipboard
                    text={booking.roomAddress}
                    onCopy={handleCopy}>
                    <td
                      className="py-3 px-4 border-b text-center cursor-pointer"
                      title={booking.roomAddress}>
                      {truncateText(booking.roomAddress, 10)}
                    </td>
                  </CopyToClipboard>
                  <td className="py-3 px-4 border-b text-center">
                    {booking.bookerName || ""}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {booking.bookerPhone || ""}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {new Date(
                      booking.bookingTime[0],
                      booking.bookingTime[1] - 1,
                      booking.bookingTime[2],
                      booking.bookingTime[3],
                      booking.bookingTime[4]
                    ).toLocaleString()}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {booking.status}
                  </td>
                  <td className="py-3 px-4 border-b text-center">
                    {booking.confirmedBy || ""}
                  </td>
                  <td className="py-3 px-4 border-b text-center space-x-2">
                    {booking.status === "CONFIRMED" ? (
                      <>
                        <span className="text-green-600 font-bold">
                          Accepted
                        </span>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                          onClick={() => handleCancel(booking.id)}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                          onClick={() => handleAccept(booking.id)}>
                          Accept
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                          onClick={() => handleRefuse(booking.id)}>
                          Refuse
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
