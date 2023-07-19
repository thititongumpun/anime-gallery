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
      effect="coverflow"
      slidesPerView={3}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      keyboard={{
        enabled: true,
      }}
      centeredSlides={true}
      pagination={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      grabCursor={true}
      loop={true}
      modules={[EffectCoverflow, Keyboard, Autoplay, Pagination, FreeMode]}
    >
      {products?.map((img, idx) => (
        <SwiperSlide key={idx}>
          <ImageShowCase product={img} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
