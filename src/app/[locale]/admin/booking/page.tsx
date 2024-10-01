"use client";

import { useEffect, useState } from "react";
import { fetchData, IMG_URL } from "../../../../service/api";
import { houseApiPath } from "@/utils/admin/apiPath";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../../../styles/globals.css";
import "../../../../styles/table.css";
import { confirmBooking } from "@/service/admin/confirmBooking";
import { refuseBooking, cancelBooking } from "@/service/admin/bookingActions";
import ModalRefuseBooking from "../../../../component/admin/ModalRefuseBooking";
import ModalCancelBooking from "../../../../component/admin/ModalCancelBooking";
import { Booking } from "../../../../service/interfaces/Booking";

const BookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalRefuseOpen, setIsModalRefuseOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const [reRender, setRender] = useState(false);

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
        console.log(fetchedBookings);
    
        setBookings(sortedBookings);
        setFilteredBookings(sortedBookings); // Set initial filtered bookings
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    
    getBookings();
  }, [reRender]);

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

  // Hàm xử lý accept
  const handleAccept = async (bookingId: string, message: string) => {
    try {
      await confirmBooking(bookingId, message);
      setRender(!reRender);
      toast.success("Accept successfully!", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Failed to accept booking.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  // Hàm xử lý refuse
  const handleRefuseConfirm = async (reason: string) => {
    if (!selectedBookingId) return;

    try {
      await refuseBooking(selectedBookingId, reason);
      setRender(!reRender);
      toast.success("Booking refused successfully!", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Failed to refuse booking.", {
        position: "top-center",
        autoClose: 1000,
      });
    }

    handleModalRefuseClose();
  };

  // Hàm xử lý cancel
  const handleCancelConfirm = async (reason: string) => {
    if (!selectedBookingId) return;

    try {
      await cancelBooking(selectedBookingId, reason);
      setRender(!reRender);
      toast.success("Booking canceled successfully!", {
        position: "top-center",
        autoClose: 1000,
      });
    } catch (error) {
      toast.error("Failed to canceled booking.", {
        position: "top-center",
        autoClose: 1000,
      });
    }

    handleModalClose();
  };

  const handleRefuse = (id: string) => {
    setSelectedBookingId(id);
    setIsModalRefuseOpen(!isModalRefuseOpen);
  };

  const handleCancel = (id: string) => {
    setSelectedBookingId(id);
    setIsModalOpen(!isModalOpen);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalRefuseClose = () => {
    setIsModalRefuseOpen(!isModalRefuseOpen);
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
    <div className="max-w-7xl mx-auto p-4 h-screen w-screen overflow-y-auto">
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
                {/* <th className="py-3 px-4 border-b">User ID</th> */}
                <th className="py-3 px-4 border-b">Name</th>
                <th className="py-3 px-4 border-b">Address</th>
                <th className="py-3 px-4 border-b">Booker Name</th>
                <th className="py-3 px-4 border-b">Booker Phone</th>
                <th className="py-3 px-4 border-b">Booking Time</th>
                <th className="py-3 px-4 border-b">Status</th>
                <th className="py-3 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
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

                  <td className="py-3 px-4 border-b text-center group">
                    <span
                      className={`status-text ${
                        booking.status.name === "CONFIRMED"
                          ? "text-green-500"
                          : booking.status.name === "CANCEL"
                          ? "text-red-500"
                          : booking.status.name === "REFUSE"
                          ? "text-yellow-500"
                          : "text-gray-900"
                      }`}>
                      {booking.status.name}
                    </span>
                    <span
                      className={`tooltip hidden absolute text-white text-sm rounded-lg py-6 px-6 -translate-x-1/2 left-1/2 transform group-hover:block shadow-lg transition-all duration-300 w-80 ${
                        booking.status.name === "CONFIRMED"
                          ? "bg-green-500"
                          : booking.status.name === "CANCEL"
                          ? "bg-red-500"
                          : booking.status.name === "REFUSE"
                          ? "bg-yellow-500"
                          : "bg-gray-900"
                      }`}>
                      <div className="font-bold text-lg">
                        {booking.status.name}
                      </div>
                      <div className="mt-2 text-sm">
                        <div>Booker: {booking.bookerName || ""}</div>
                        {booking.refuseOrCancelMessage && (
                          <div className="ml-2">
                            Reason: {booking.refuseOrCancelMessage}
                          </div>
                        )}
                      </div>

                      {booking.status.name === "CONFIRMED" &&
                        booking.confirmedBy && (
                          <div className="mt-2 text-sm">
                            Confirmed by: {booking.confirmedBy}
                          </div>
                        )}
                      {booking.status.name === "CANCEL" && booking.cancelBy && (
                        <div className="mt-2 text-sm">
                          Canceled by: {booking.cancelBy}
                        </div>
                      )}
                      {booking.status.name === "REFUSE" && booking.refuseBy && (
                        <div className="mt-2 text-sm">
                          Refused by: {booking.refuseBy}
                        </div>
                      )}

                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {booking.contactQrCode.map((qr) => (
                          <img
                            key={qr.id}
                            src={`${IMG_URL}/${qr.imageUrl}`}
                            alt="Contact QR Code"
                            className="w-100 h-100 object-cover"
                          />
                        ))}
                      </div>
                    </span>
                  </td>

                  <td className="py-3 px-4 border-b text-center space-x-2">
                    {booking.status.name === "CONFIRMED" ? (
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                        onClick={() => handleCancel(booking.id)}>
                        Cancel
                      </button>
                    ) : booking.status.name === "PENDING" ? (
                      <>
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition-colors"
                          onClick={() => handleAccept(booking.id, "")}>
                          Accept
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors"
                          onClick={() => handleRefuse(booking.id)}>
                          Refuse
                        </button>
                      </>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <ModalRefuseBooking
            isOpen={isModalRefuseOpen}
            onClose={handleModalRefuseClose}
            onConfirm={handleRefuseConfirm}
          />

          <ModalCancelBooking
            isOpen={isModalOpen}
            onClose={handleModalClose}
            onConfirm={handleCancelConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default BookingsPage;
