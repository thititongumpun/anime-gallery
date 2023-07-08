import React, { useEffect, useState } from "react";
import type { Product } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "@/stores/useCart";
import { Separator } from "../ui/separator";
import { Skeleton } from "../ui/skeleton";

type Props = {
  products: Product[];
};

export default function CartTable({ products }: Props) {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [removeFromCart, totalAmount] = useCartStore((state) => [
    state.removeFromCart,
    state.totalAmount,
  ]);

  useEffect(() => {
    setCartItems(products);
    setTotal(totalAmount);
  }, [products, totalAmount]);

  return (
    <div className="min-h-80 mx-auto my-4 w-full max-w-5xl space-y-5 sm:my-8">
      <Card>
        {cartItems?.map((product) => (
          <CardContent key={product.id} className="grid gap-6 p-5">
            <div className="flex flex-col items-center justify-between space-x-4 md:flex-row">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 rounded-sm shadow-sm md:h-32 md:w-32">
                  <AvatarImage
                    src={product.image_url}
                    alt={product.description}
                  />
                  <AvatarFallback>
                    <Skeleton className="h-32 w-32 rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <div className="w-auto space-y-1 break-words">
                  <p className="text-sm font-medium leading-none">
                    {product.product_name}
                  </p>
                </div>
              </div>
              <div className="mx-auto inline-flex gap-4">
                {product.amount} $
                <TrashIcon
                  onClick={() => removeFromCart(product)}
                  className="h-6 w-6 text-red-500"
                />
              </div>
            </div>
            <Separator className="h-1 w-full" />
          </CardContent>
        ))}
      </Card>
      <div className="flex w-full justify-between">
        <p>Total</p>
        <span className="font-bold">{total} $</span>
      </div>
    </div>
  );
}
