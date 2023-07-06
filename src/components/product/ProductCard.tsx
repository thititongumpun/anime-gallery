import Link from "next/link";
import React from "react";
import Image from "next/image";
import type { Product } from "@/types/Product";
import { Label } from "@/components/ui/label";

type Props = {
  product: Product;
};
export default function ProductCard({ product }: Props) {
  return (
    <Link
      href={`/products/${product.id}`}
      passHref
      className="h-120 border-palette-lighter mx-auto w-72 rounded border shadow-lg"
    >
      <div className="border-palette-lighter relative h-72 border-b-2">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.description}
            fill
            sizes="(100vw, 100vh)"
            priority
            className="transform duration-500 ease-in-out hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
            <svg
              className="h-10 w-10"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
            <Label>NO IMAGE</Label>
          </div>
        )}
      </div>
      <div className=" relative h-48">
        <div className="px-4 pt-4 font-serif text-lg tracking-wide text-[#E85E18]">
          {/* {title} */}
          {product.product_name}
        </div>
        <div className="p-4 text-sm font-light text-slate-500">
          {/* {description} */}
          {product.description}
        </div>
        <div
          className="triangle absolute bottom-0 right-0 mb-4 rounded-tl-sm pb-1 pl-8 pr-4 pt-2 
            text-base font-medium"
        >
          {/* <Price currency="$" num={price} numSize="text-lg" /> */}
          {product.amount}
        </div>
      </div>
    </Link>
  );
}
