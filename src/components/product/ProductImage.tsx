import React from "react";
import type { Product } from "@/types/Product";
import Image from "next/image";

type Props = {
  product: Product;
};

export default function ProductImage({ product }: Props) {
  return (
    <div className="border-palette-lighter w-full max-w-md rounded border bg-white shadow-lg md:w-1/2">
      <div className="relative h-96">
        <Image
          src={product.image_url}
          alt={product.product_name}
          fill
          priority
          sizes="(100vw, 100vh)"
          className="transform duration-500 ease-in-out hover:scale-105"
        />
      </div>
      {/* <div className="border-palette-lighter relative flex border-t">
        <button
          aria-label="left-scroll"
          className="bg-palette-lighter hover:bg-palette-light absolute  left-0 z-10 h-32 opacity-75"
          onClick={() => scroll(-300)}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="text-palette-primary mx-1 w-3"
          />
        </button>
        <div
          ref={ref}
          style={{ scrollBehavior: "smooth" }}
          className="border-palette-lighter flex w-full space-x-1 overflow-auto border-t"
        >
          {images.map((imgItem, index) => (
            <button
              key={index}
              className="relative h-32 w-40 flex-shrink-0 rounded-sm "
              onClick={() => setMainImg(imgItem.node)}
            >
              <Image
                src={imgItem.node.originalSrc}
                alt={imgItem.node.altText}
                layout="fill"
                className=""
              />
            </button>
          ))}
        </div>
        <button
          aria-label="right-scroll"
          className="bg-palette-lighter hover:bg-palette-light absolute  right-0 z-10 h-32 opacity-75"
          onClick={() => scroll(300)}
        >
          <FontAwesomeIcon
            icon={faArrowRight}
            className="text-palette-primary mx-1 w-3"
          />
        </button>
      </div> */}
    </div>
  );
}
