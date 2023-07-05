import React from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/Product";

type Props = {
  products: Product[];
};

export default function ProductList({ products }: Props) {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-x-4 gap-y-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
