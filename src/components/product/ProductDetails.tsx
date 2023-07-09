import React from "react";
import type { Product } from "@prisma/client";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCart";

type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {
  const [cart, addToCart] = useCartStore((state) => [
    state.cart,
    state.addToCart,
  ]);

  return (
    <div className="min-h-128 mx-auto flex h-full w-full max-w-xs flex-col justify-between space-y-4 md:w-1/2">
      {/* <BackToProductButton /> */}
      <div>
        <h1 className=" py-2 text-3xl font-extrabold leading-relaxed sm:py-4">
          {product.product_name}
        </h1>
        <p className="text-lg font-medium">{product.description}</p>
        <div className=" px-1 py-4 text-xl font-medium">
          {/* <Price currency="$" num={price} numSize="text-2xl" /> */}
          {product.amount}
        </div>
      </div>
      <Button
        onClick={() => addToCart(product)}
        disabled={!cart.every((item) => item.id !== product.id)}
      >
        xd
      </Button>
      {/* <ProductForm 
        title={productData.title}
        handle={productData.handle}
        variants={productData.variants.edges} 
        mainImg={productData.images.edges[0].node}
        setVariantPrice={setVariantPrice}
      /> */}
    </div>
  );
}
