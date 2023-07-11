import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Keyboard,
  EffectCoverflow,
  Autoplay,
  Pagination,
  FreeMode,
} from "swiper/modules";
import type { Product } from "@prisma/client";
import ImageShowCase from "./ImageShowCase";
type Props = {
  products?: Product[];
};

export default function Slider({ products }: Props) {
  return (
    <Swiper
      spaceBetween={5}
      slidesPerView={5}
      keyboard={{
        enabled: true,
      }}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      grabCursor={true}
      loop={true}
      modules={[Keyboard, EffectCoverflow, Autoplay, Pagination, FreeMode]}
    >
      {products?.map((img, idx) => (
        <SwiperSlide key={idx}>
          <ImageShowCase product={img} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
