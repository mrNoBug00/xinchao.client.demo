import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel: React.FC = () => {
  // Mảng ảnh được khai báo trực tiếp bên trong component
    const images = [
      "/IMG_6921.JPG",
      "/IMG_6923.JPG",
      "/IMG_6924.JPG",
      "/IMG_6925.JPG",
      "/IMG_6926.JPG",
      "/IMG_6928.JPG",
      "/IMG_6931.JPG",
      "/IMG_6930.JPG",
      "/IMG_6936.JPG",
    ];

  const settings = {
    infinite: true,
    speed: 5000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
      arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3, // Hiển thị 2 ảnh trên màn hình nhỏ
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2, // Hiển thị 1 ảnh trên màn hình nhỏ hơn
          slidesToScroll: 1,
        },
      },
    ],
  };


  return (
    <div className="overflow-hidden bg-gray-900">
      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={200}
              height={100}
              className="object-cover rounded-lg"
              priority // Tối ưu hóa ảnh đầu tiên khi tải trang
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
