"use client";

import React, { useState } from "react";
import Image from "next/image";

interface UploadImageProps {
  imageFiles: File[];
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

const UploadImage: React.FC<UploadImageProps> = ({
  imageFiles,
  setImageFiles,
}) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

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

  const handleSvgClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Kích hoạt input file khi người dùng click vào SVG
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <label className="block text-sm font-medium text-gray-700 mb-4">
        Upload Identification Card Images
      </label>

      <p>Plases upload both font and back Identification Card Images</p>

      {/* SVG icon làm nút bấm */}
      <button
        type="button"
        onClick={handleSvgClick}
        className="bg-indigo-50 p-3 rounded-md hover:bg-indigo-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 w-12 h-12 text-indigo-700">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </button>

      {/* Input file ẩn, được kích hoạt bởi nút SVG */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleImageChange}
        className="hidden"
      />

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative w-36 h-36">
            <Image
              src={preview}
              alt={`preview-${index}`}
              className="object-cover rounded-md shadow-lg"
              width={100}
              height={100}
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
              onClick={() => handleRemoveImage(index)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadImage;
