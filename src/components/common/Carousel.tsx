import Image from "next/image";
import Link from "next/link";
import type { Product } from "@prisma/client";

type Props = {
  products?: Product[];
};

export default function Carousel({ products }: Props) {
  if (!products?.length) return null;

  return (
    <div className="relative w-full overflow-hidden bg-black dark:bg-white">
      <div className="flex animate-carousel">
        {products.map((product, i) => (
          <Link
            key={`${product.description}${i}`}
            href={`/products/${product.id}`}
            className="relative h-[30vh] w-1/2 flex-none md:w-1/3"
          >
            {product.image_url ? (
              <Image
                alt={product.product_name}
                className="h-full w-full object-cover"
                fill
                sizes="33vw"
                src={product.image_url}
              />
            ) : null}
            <div className="absolute inset-y-0 right-0 flex items-center justify-center">
              <div className="inline-flex bg-white p-4 text-xl font-semibold text-black dark:bg-black dark:text-white">
                {product.product_name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
