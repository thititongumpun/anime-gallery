import React from "react";
import type { NextPageWithLayout } from "../_app";
import DefaultLayout from "@/components/common/DefaultLayout";
import { api } from "@/utils/api";
import Link from "next/link";
import Price from "@/components/common/Price";
import Loading from "@/components/common/Loading";

const OrderPage: NextPageWithLayout = () => {
  const { data: orders, isLoading } = api.order.getOrders.useQuery();

  if (isLoading) return <Loading />;

  return (
    <div className="mx-auto mt-4 flex max-w-screen-xl flex-col px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-xl font-bold text-gray-800 sm:text-2xl">
            Your Order
          </h3>
        </div>
      </div>
      <div className="relative mt-12 h-max overflow-auto">
        <table className="w-full table-auto text-left text-sm">
          <thead className="border-b font-medium text-gray-600">
            <tr>
              <th className="py-3 pr-6">#</th>
              <th className="py-3 pr-6">Date</th>
              <th className="py-3 pr-6">Description</th>
              <th className="py-3 pr-6">Total</th>
              <th className="py-3 pr-6">Status</th>
              <th className="py-3 pr-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y text-gray-600">
            {orders?.map((item, idx) => (
              <tr key={idx}>
                <td className="whitespace-nowrap py-4 pr-6">{item.id}</td>
                <td className="whitespace-nowrap py-4 pr-6">
                  {item.createdAt.toISOString()}
                </td>
                <td className="whitespace-nowrap py-4 pr-6">
                  {item.description}
                </td>
                <td className="whitespace-nowrap py-4 pr-6">
                  <Price amount={item.total_amount as number} />
                </td>
                <td className="whitespace-nowrap py-4 pr-6">
                  <span
                    className={`rounded-full px-3 py-2 text-xs font-semibold ${
                      item.status == "succeeded"
                        ? "bg-green-50 text-green-600"
                        : "bg-blue-50 text-blue-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="whitespace-nowrap text-right">
                  <Link href={`/order/${item.id}`}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

OrderPage.getLayout = (page: React.ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default OrderPage;
