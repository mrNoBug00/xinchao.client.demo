"use client";

import { useState } from "react";
import Image from "next/image";
import "../../../../../../styles/globals.css";
import FileUpload from "@/component/FileUploadProps";
import { houseApiPath } from "@/utils/apiPath";

interface ScheduleViewingFormData {
  name: string;
  phone: string;
  date: string;
  time: string;
  images: File[];
}

export default function ScheduleViewingPage({
  params,
}: {
  params: { id: string };
}) {
  const [formData, setFormData] = useState<ScheduleViewingFormData>({
    name: "",
    phone: "",
    date: "",
    time: "",
    images: [],
  });
  const [errors, setErrors] = useState<Partial<ScheduleViewingFormData>>({});
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const validateForm = () => {
    const newErrors: Partial<ScheduleViewingFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const uploadImages = async (): Promise<string[]> => {
    const data = new FormData();

    formData.images.forEach((image) => {
      data.append("files", image); // Add each file
    });

    const response = await fetch("http://localhost:8080/api/v1/images", {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error("Failed to upload images");
    }

    const result = await response.json();
    return result.map((img: { id: string }) => img.id);
  };

  const submitBooking = async (imageIds: string[]) => {
    const bookingData = {
      userId: "yourUserId", // Thay bằng userId thực tế
      roomId: params.id,
      bookerName: formData.name,
      bookerPhone: formData.phone,
      bookingTime: `${formData.date}T${formData.time}`,
      contactQrCode: imageIds,
    };

    const response = await fetch(houseApiPath.bookingHouse, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      throw new Error("Failed to create booking");
    }

    return await response.json();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const imageIds = await uploadImages();
      const bookingResponse = await submitBooking(imageIds);
      console.log("Booking created successfully:", bookingResponse);
      setFormData({ name: "", phone: "", date: "", time: "", images: [] });
      setPreviewImages([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleImageChange = async (files: File[]) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));

    // Create previews for new images
    const newPreviews = await Promise.all(
      files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      })
    );

    setPreviewImages((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg m-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Schedule Viewing</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Time</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.time && (
            <p className="text-red-500 text-sm mt-1">{errors.time}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Images</label>
          <FileUpload onFileSelect={handleImageChange} />
          <div className="mt-2 grid grid-cols-2 gap-2">
            {previewImages.map((preview, index) => (
              <div key={index} className="relative">
                <Image
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  width={200}
                  height={200}
                  className="rounded-md object-cover"
                  unoptimized // Add this to allow data URLs
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                  aria-label="Remove image">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
          Submit
        </button>
      </form>
    </div>
  );
}
