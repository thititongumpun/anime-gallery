import React from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import DefaultLayout from "@/components/common/DefaultLayout";
import type { GetStaticProps } from "next";
import { generateSSGHelper } from "@/server/helpers/ssgHelper";
import { api } from "@/utils/api";
import ProductImage from "@/components/product/ProductImage";
import ProductDetails from "@/components/product/ProductDetails";
import ProductReview from "@/components/review/ProductReview";

const ProductPage: NextPageWithLayout<{ id: string }> = ({ id }) => {
  const { data } = api.product.getProductById.useQuery({
    id,
  });

  if (!data) return <div>404</div>;

  return (
    <main className="min-h-screen py-12 sm:pt-20">
      <div className="mx-auto flex w-11/12 max-w-6xl flex-col items-center justify-center space-y-8 md:flex-row md:items-start md:space-x-4 md:space-y-0 lg:space-x-8">
        <ProductImage product={data} />
        <ProductDetails product={data} />
      </div>
      {/* <Button className="flex items-center justify-center">asd</Button> */}
      <ProductReview />
    </main>
  );
};

ProductPage.getLayout = function (page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await ssg.product.getProductById.prefetch({ id });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProductPage;
