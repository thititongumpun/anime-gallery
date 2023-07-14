import React from "react";
import type { Product } from "@/types/Product";
import Image from "next/image";
import { cloudinaryImageLoader } from "@/utils/cloudinary";

type Props = {
  product: Product;
};

export default function ProductImage({ product }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-1">
      <Image
        loader={cloudinaryImageLoader}
        src={product.image_url}
        alt={product.product_name}
        priority
        width={1770}
        height={72}
        sizes="(100vw, 100vh)"
        className="transform rounded-xl object-cover duration-500 ease-in-out hover:scale-105"
      />

      <div className="grid grid-cols-2 gap-4 lg:mt-4">
        <Image
          loader={cloudinaryImageLoader}
          src={product.image_url}
          alt={product.product_name}
          priority
          width={1440}
          height={72}
          sizes="(100vw, 100vh)"
          className="transform rounded-xl object-cover duration-500 ease-in-out hover:scale-105"
        />

        <Image
          loader={cloudinaryImageLoader}
          src={product.image_url}
          alt={product.product_name}
          priority
          width={1770}
          height={72}
          sizes="(100vw, 100vh)"
          className="transform rounded-xl object-cover duration-500 ease-in-out hover:scale-105"
        />

        <Image
          loader={cloudinaryImageLoader}
          src={product.image_url}
          alt={product.product_name}
          priority
          width={1770}
          height={72}
          sizes="(100vw, 100vh)"
          className="transform rounded-xl object-cover duration-500 ease-in-out hover:scale-105"
        />

        <Image
          loader={cloudinaryImageLoader}
          src={product.image_url}
          alt={product.product_name}
          priority
          width={1770}
          height={72}
          sizes="(100vw, 100vh)"
          className="transform rounded-xl object-cover duration-500 ease-in-out hover:scale-105"
        />
      </div>
    </div>
  );
}
