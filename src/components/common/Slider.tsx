import React from "react";
import type { Product } from "@prisma/client";
import ImageShowCase from "./ImageShowCase";
import Slider from "react-slick";
type Props = {
  products?: Product[];
};

export default function Sliderx({ products }: Props) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    centerPadding: "60px",
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 4500,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <Slider {...settings}>
      {products?.map((img, idx) => (
        <ImageShowCase key={idx} product={img} />
      ))}
    </Slider>
  );
}
