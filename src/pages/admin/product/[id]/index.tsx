import React from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Layout from "@/components/common/Layout";
import type { NextPageWithLayout } from "@/pages/_app";
import { cloudinaryImageLoader } from "@/utils/cloudinary";
import EditProductAdmin from "@/components/product/EditProductAdmin";
import Price from "@/components/common/Price";
import dynamic from "next/dynamic";

const Loading = dynamic(() => import("@/components/common/Loading"));

const ProductPage: NextPageWithLayout = () => {
  const router = useRouter();
  const productId = router.query.id as string;

  const { data, isLoading } = api.productAdmin.getProductById.useQuery(
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
    <section className="mx-auto flex max-w-md flex-col justify-center overflow-hidden rounded-lg bg-white shadow">
      <Image
        loader={cloudinaryImageLoader}
        src={data.image_url}
        alt={data.description}
        width={1200}
        height={500}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority
        className="aspect-square w-full rounded-md object-contain"
      />
      <div className="space-y-2">
        <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
          {data?.product_name}
        </h3>
        <Price amount={data.amount} />
        <p>
          Published At <time>{data?.publishedAt.toDateString()}</time>
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
        </div>
        <h3>Published By {data?.publishedBy}</h3>
        <div className="inline-flex gap-4">
          <EditProductAdmin product={data} />
          <Button variant="destructive" onClick={router.back}>
            Back
          </Button>
        </div>
      </div>
    </section>
  );
};

ProductPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProductPage;
