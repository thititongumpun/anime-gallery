import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@prisma/client";
import { cloudinaryImageLoader } from "@/utils/cloudinary";

type Props = {
  product: Product;
};

export default function ImageShowCase({ product }: Props) {
  const { id, image_url, product_name } = product;

  return (
    <Link href={`/products/${id}`}>
      <div className="relative mx-auto h-32 w-32 md:h-64 md:w-64">
        <Image
          loader={cloudinaryImageLoader}
          src={image_url}
          alt={product_name}
          fill
          className="rounded-lg object-cover"
          sizes="(min-width: 60em) 24vw,
                    (min-width: 28em) 45vw,
                    100vw"
          priority
        />
      </div>
    </Link>
  );
}
