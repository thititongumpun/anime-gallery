import React from "react";
import type { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCart";
import { toast } from "../ui/use-toast";
import Price from "../common/Price";
import { Badge } from "../ui/badge";
import { cloudinaryImageLoader } from "@/utils/cloudinary";
type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { id, product_name, amount, is_new, image_url } = product;
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <div className="mb-2 flex w-full min-w-[15rem] snap-center flex-col justify-between rounded-lg bg-gray-50 shadow-lg drop-shadow-md dark:text-black md:w-60">
      <Link href={`/products/${id}`}>
        <div className="group relative block h-72 w-full overflow-hidden">
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
      <div className="relative border border-gray-100 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              {product_name}
            </h3>
            <Price amount={amount} />
          </div>
          <div>
            {is_new && <Badge className="bg-green-500">New</Badge>}
          </div>
        </div>

        <Button
          variant="outline"
          className="mt-4 w-full rounded bg-slate-50 p-4 transition hover:scale-105 dark:text-black"
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
  );
}
