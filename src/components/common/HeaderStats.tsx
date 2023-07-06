import React from "react";
import CardStats from "./CardStats";
import { api } from "@/utils/api";
import Loading from "./Loading";
import {
  ArchiveBoxIcon,
  UserGroupIcon,
  TagIcon,
} from "@heroicons/react/24/outline";

type Stats = {
  statSubtitle: string;
  statTitle: number;
  statIcon: React.ReactElement;
  statIconColor: string;
  href: string;
};

export default function HeaderStats() {
  const { data: products, isLoading } =
    api.productAdmin.getProducts.useQuery({categoryId: ""});
  const { data: categories, isLoading: isLoadingCategories } =
    api.category.getCategories.useQuery();
  const { data: users, isLoading: isLoadingUsers } =
    api.user.getUsers.useQuery();

  if (isLoading) return <Loading />;
  if (isLoadingCategories) return <Loading />;
  if (isLoadingUsers) return <Loading />;

  if (!products) return <div>Somethin went wrong...</div>;
  if (!categories) return <div>Somethin went wrong...</div>;
  if (!users) return <div>Somethin went wrong...</div>;

  const stats: Stats[] = [
    {
      statSubtitle: "Product",
      statTitle: products.length,
      statIcon: <ArchiveBoxIcon />,
      statIconColor: "bg-blue-500",
      href: "/admin/product",
    },
    {
      statSubtitle: "Category",
      statTitle: categories.length,
      statIcon: <TagIcon />,
      statIconColor: "bg-orange-500",
      href: "/admin/category",
    },
    {
      statSubtitle: "User",
      statTitle: users.length,
      statIcon: <UserGroupIcon />,
      statIconColor: "bg-green-500",
      href: "/admin/user",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="pb-32 pt-12 md:pt-24">
        <div className="mx-auto w-full px-4 md:px-10">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap justify-center">
              {stats.map((stat, idx) => (
                <div className="w-full px-4 lg:w-6/12 xl:w-3/12" key={idx}>
                  <CardStats
                    statSubtitle={stat.statSubtitle}
                    statTitle={stat.statTitle}
                    statIcon={stat.statIcon}
                    statIconColor={stat.statIconColor}
                    href={stat.href}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
