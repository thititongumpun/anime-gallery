import React from "react";
import type { Product } from "@prisma/client";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCart";
import Price from "../common/Price";
import { useRouter } from "next/router";
import ReviewForm from "../review/ReviewForm";

type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  return (
    <div className="min-h-128 mx-auto flex h-full w-full max-w-xs flex-col justify-between space-y-4 md:w-1/2">
      <div>
        <h1 className=" py-2 text-3xl font-extrabold leading-relaxed sm:py-4">
          {product.product_name}
        </h1>
        <p className="text-lg font-medium">{product.description}</p>
        <div className=" px-1 py-4 text-xl font-medium">
          <Price amount={product.amount} />
        </div>
      </div>

      <div className="inline-flex">
        <Button
          variant={"outline"}
          className="rounded-l-lg px-4 py-2 text-sm font-medium focus:z-10"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </Button>
        <Button
          variant={"outline"}
          className="rounded-l-lg px-4 py-2 text-sm font-medium focus:z-10"
          onClick={router.back}
        >
          Back
        </Button>
        <ReviewForm />
      </div>

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
