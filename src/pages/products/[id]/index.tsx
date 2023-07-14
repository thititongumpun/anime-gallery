import React from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import DefaultLayout from "@/components/common/DefaultLayout";
import type { GetStaticProps } from "next";
import { generateSSGHelper } from "@/server/helpers/ssgHelper";
import { api } from "@/utils/api";
import ProductImage from "@/components/product/ProductImage";
import ProductDetails from "@/components/product/ProductDetails";

const ProductPage: NextPageWithLayout<{ id: string }> = ({ id }) => {
  const { data } = api.product.getProductById.useQuery(
    {
      id,
    },
    {
      enabled: !!id,
    }
  );

  if (!data) return <div>404</div>;

  return (
    <section>
      <div className="relative mx-auto max-w-screen-xl px-4 py-8">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <ProductImage product={data} />
          <ProductDetails product={data} />
        </div>
      </div>
    </section>
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
