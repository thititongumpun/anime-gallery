import React from "react";
import type { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCart";
import { toast } from "../ui/use-toast";
import Price from "../common/Price";
import { Badge } from "../ui/badge";
type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { id, product_name, amount, image_url } = product;
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="mb-2 flex w-full min-w-[15rem] snap-center flex-col justify-between rounded-lg bg-gray-50 shadow-lg drop-shadow-md dark:text-black md:w-60">
      <Link href={`/products/${id}`}>
        <div className="relative h-80 w-full object-cover ">
          <Image
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
      <div className="flex w-full flex-col items-center justify-end gap-4 px-3 py-4 ">
        <Link
          href={`/products/${id}`}
          className="flex w-full flex-col items-center justify-end gap-2"
        >
          <h4 className=" text-center text-xl font-medium hover:text-amber-400 ">
            {product_name}
          </h4>
          <div className="flex flex-wrap">
            <Badge variant="secondary" className="bg-green-500">New</Badge>
          </div>
          <Price amount={amount} />
        </Link>
        <div className="flex w-full justify-center">
          <Button
            variant="outline"
            className="w-full dark:text-white"
            onClick={() => {
              addToCart(product);
              toast({
                description: "Added to cart!",
              });
            }}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
