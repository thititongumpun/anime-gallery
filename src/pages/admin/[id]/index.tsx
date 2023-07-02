import React from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "@/components/ui/button";

export default function ProductPage() {
  const router = useRouter();
  const productId = router.query.id as string;

  const { data } = api.product.getProductById.useQuery(
    {
      id: productId,
    },
    {
      enabled: !!productId,
    }
  );

  if (!data) return <div>Something went wrong...</div>;

  return (
    <div className="mx-auto flex max-w-md flex-col justify-center overflow-hidden rounded-lg bg-white shadow">
      <AspectRatio ratio={16 / 9}>
        <Image
          src={data.image_url}
          alt={data.description}
          fill
          className="rounded-md object-contain"
        />
      </AspectRatio>
      <div className="p-4">
        <p className="text-primary-500 mb-1 text-sm">
          {data?.product_name} <b>published at</b> •{" "}
          <time>{data?.publishedAt.toDateString()}</time>
        </p>
        <h3 className="text-xl font-medium text-gray-900">Description</h3>
        <p className="mt-1 text-gray-500">{data?.description}</p>

        <div className="mt-4 flex gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
            {data?.category?.category_name}
          </span>
          {data?.is_new && (
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
              New
            </span>
          )}

          {data?.is_bestseller && (
            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
              Best Seller
            </span>
          )}
        </div>
        <h3>Published By {data?.publishedBy}</h3>
        <Button variant="destructive" onClick={router.back}>
          Back
        </Button>
      </div>
    </div>
  );
}
