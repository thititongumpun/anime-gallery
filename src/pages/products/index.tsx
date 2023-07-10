import React, { Fragment, useEffect } from "react";
import type { NextPageWithLayout } from "../_app";
import DefaultLayout from "@/components/common/DefaultLayout";
import Loading from "@/components/common/Loading";
import { useInView } from "react-intersection-observer";
import { api } from "@/utils/api";
import ProductCard from "@/components/product/ProductCard";

export const ProductPageList: NextPageWithLayout = () => {
  const { ref, inView } = useInView();
  const {
    data: products,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = api.product.getProductsBatch.useInfiniteQuery(
    {
      limit: 4,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, inView]);

  if (isLoading) return <Loading />;
  
  return (
    <>
      <section className="mt-16 h-fit px-4 py-4 md:px-8">
        <div className="flex flex-col items-center justify-center">
          <h2 className="mb-8 text-3xl font-bold ">All Products</h2>
          <div className="grid auto-cols-max grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products?.pages.map((page, idx) => (
              <Fragment key={idx}>
                {page.items.map((item) => (
                  <ProductCard key={item.id} product={item} />
                ))}
              </Fragment>
            ))}

            <span style={{ visibility: "hidden" }} ref={ref}>
              intersection observer marker
            </span>
          </div>
          {isFetchingNextPage ? <Loading /> : null}
        </div>
      </section>
    </>
  );
};

ProductPageList.getLayout = function (page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default ProductPageList;
