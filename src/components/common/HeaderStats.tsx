import React from "react";
import CardStats from "./CardStats";
import { api } from "@/utils/api";
import Loading from "./Loading";
import {
  ArchiveBoxIcon,
  UserGroupIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

export default function HeaderStats() {
  const { data: products, isLoading } = api.product.getProductCount.useQuery();
  const { data: categories, isLoading: isLoadingCategories } =
    api.category.getCategoryCount.useQuery();
  const { data: users, isLoading: isLoadingUsers } =
    api.user.getUserCount.useQuery();

  if (isLoading) return <Loading />;
  if (isLoadingCategories) return <Loading />;
  if (isLoadingUsers) return <Loading />;

  if (!products) return <div>Somethin went wrong...</div>;
  if (!categories) return <div>Somethin went wrong...</div>;
  if (!users) return <div>Somethin went wrong...</div>;

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
                  statIcon={<ArchiveBoxIcon />}
                  statIconColor="bg-blue-500"
                />
              </div>
              <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
                <CardStats
                  statSubtitle="Category"
                  statTitle={categories}
                  statIcon={<TagIcon />}
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full px-4 lg:w-6/12 xl:w-3/12">
                <CardStats
                  statSubtitle="User"
                  statTitle={users}
                  statIcon={<UserGroupIcon />}
                  statIconColor="bg-green-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
