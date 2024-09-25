"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createBooking } from "../service/house/handleBooking";
import "../styles/globals.css";
import "../styles/bookingForm.css"; // Add this line
import { ToastContainer, toast } from "react-toastify";
import { BookingFormProps } from "../service/interfaces/Booking";
import Image from "next/image";
import { houseApiPath } from "@/utils/apiPath";
import { fetchData } from "@/service/api";

const BookingForm: React.FC<BookingFormProps> = ({ roomId }) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState(""); // Ngày
  const [hour, setHour] = useState("1");
  const [minute, setMinute] = useState("00");
  const router = useRouter();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("User ID is not available.");
      return;
    }

    // Upload identification cards
    const formDataImages = new FormData();
    imageFiles.forEach((file) => {
      const randomFileName = generateRandomFileName(file.name);
      const renamedFile = new File([file], randomFileName, {
        type: file.type,
      });
      formDataImages.append("files", renamedFile);
    });

    const responseImages = await fetchData(houseApiPath.uploadContactQrCode, {
      method: "POST",
      body: formDataImages,
    });

    const dataImages = await responseImages;

    const imageIds = dataImages.map((image: any) => image.id);

    const bookingTime = `${date}T${hour}:${minute}:00`; // Định dạng ngày giờ

    const result = await createBooking(
      userId,
      roomId,
      bookingTime,
      username,
      phone,
      imageIds
    );

    if (result.success) {
      toast.success("Accept successfully!", {
        position: "top-center",
        autoClose: 1000,
      });
      setTimeout(() => {
        router.push("/pages/home");
      }, 2000);
    } else {
      toast.error("Failed to accept booking.", {
        position: "top-center",
        autoClose: 1000,
      });
    }
  };

  const generateRandomFileName = (originalName: string): string => {
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = originalName.split(".").pop();
    return `${randomString}contactQrCode.${fileExtension}`;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(files);

      const previews = files.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    const newImagePreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newImageFiles);
    setImagePreviews(newImagePreviews);
  };

  return (
    <div>
      <ToastContainer />

      <div className="info-box">
        <p>
          To facilitate scheduling, customers should make an appointment 3 days
          in advance so the company can arrange for staff to show them the
          house. Please note that 30 minutes before the house viewing, a staff
          member will call to confirm. If the customer does not answer, the
          company of staff will not come.
        </p>
      </div>
      <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Create New Booking</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">User name</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Booking Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Booking Time</label>
            <div className="flex">
              <select
                value={hour}
                onChange={(e) => setHour(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 mr-2"
                required>
                {Array.from({ length: 24 }, (_, h) => (
                  <option key={h + 1} value={h + 1}>
                    {h + 1}
                  </option>
                ))}
              </select>

              <select
                value={minute}
                onChange={(e) => setMinute(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                required>
                {[0, 15, 30, 45].map((m) => (
                  <option key={m} value={m < 10 ? `0${m}` : m}>
                    {m < 10 ? `0${m}` : m}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Qr Code Of Line Or Zalo
            </label>
            <button
              type="button"
              onClick={() => document.getElementById("fileInput")?.click()}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-2 bg-blue-500 text-white">
              Select Files
            </button>
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    src={preview}
                    alt={`Preview ${index}`}
                    className="w-full h-40 object-cover rounded-md"
                    width={500}
                    height={300}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full">
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700">
              Create Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
