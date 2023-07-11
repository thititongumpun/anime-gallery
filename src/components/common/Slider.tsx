import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Keyboard,
  EffectCoverflow,
  Autoplay,
  Pagination,
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
      slidesPerView={5}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
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
      modules={[Keyboard, EffectCoverflow, Autoplay, Pagination]}
    >
      {products?.map((img, idx) => (
        <SwiperSlide key={idx}>
          <ImageShowCase product={img} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
