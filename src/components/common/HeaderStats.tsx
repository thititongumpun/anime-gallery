import React from "react";
import CardStats from "./CardStats";
import { api } from "@/utils/api";
import Loading from "./Loading";
import { ArchiveIcon, BackpackIcon } from "@radix-ui/react-icons";

export default function HeaderStats() {
  const { data: products, isLoading } = api.product.getProductCount.useQuery();
  const { data: categories, isLoading: isLoadingCategories } =
    api.category.getCategoryCount.useQuery();

  if (isLoading) return <Loading />;
  if (isLoadingCategories) return <Loading />;

  if (!products) return <div>Somethin went wrong...</div>;
  if (!categories) return <div>Somethin went wrong...</div>;

  return (
    <>
      {/* Header */}
      <div className="pb-32 pt-12 md:pt-32">
        <div className="mx-auto w-full px-4 md:px-10">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
                <CardStats
                  statSubtitle="Product"
                  statTitle={products}
                  statIcon={<BackpackIcon />}
                  statIconColor="bg-blue-500"
                />
              </div>
              <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
                <CardStats
                  statSubtitle="Category"
                  statTitle={categories}
                  statIcon={<ArchiveIcon />}
                  statIconColor="bg-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
