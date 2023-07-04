import React from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Button } from "@/components/ui/button";
import Loading from "@/components/common/Loading";
import Layout from "@/components/common/Layout";
import { Label } from "@/components/ui/label";

export default function ProductPage() {
  const router = useRouter();
  const productId = router.query.id as string;

  const { data, isLoading } = api.product.getProductById.useQuery(
    {
      id: productId,
    },
    {
      enabled: !!productId,
    }
  );

  if (isLoading) return <Loading />;

  if (!data) return <div>Something went wrong...</div>;

  return (
    <Layout>
      <div className="mx-auto flex max-w-md flex-col justify-center overflow-hidden rounded-lg bg-white shadow">
        <AspectRatio ratio={16 / 9}>
          {data?.image_url ? (
            <Image
              src={data.image_url}
              alt={data.description}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="rounded-md object-contain"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
              <svg
                className="h-10 w-10 text-gray-200 dark:text-gray-600"
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
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
              New
            </span>

            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">
              Best Seller
            </span>
          </div>
          <h3>Published By {data?.publishedBy}</h3>
          <Button variant="destructive" onClick={router.back}>
            Back
          </Button>
        </div>
      </div>
    </Layout>
  );
}
