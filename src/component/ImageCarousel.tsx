import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageCarousel: React.FC = () => {
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
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-0 h-full w-8 md:w-96" />
      <div className="absolute top-0 right-0 h-full w-8 md:w-96" />

      <Slider {...settings}>
        {images.map((src, index) => (
          <div key={index}>
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              width={200}
              height={100}
              className="object-cover rounded-lg"
              priority
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageCarousel;
