import React from "react";
import { api } from "@/utils/api";
import Layout from "@/components/common/Layout";
import DataTable from "@/components/common/DataTable";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { NextPageWithLayout } from "@/pages/_app";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";

type Product = {
  id: string;
  product_name: string;
  amount: number;
  is_new: boolean;
  is_bestseller: boolean;
  category: {
    category_name: string;
  };
};

const Loading = dynamic(() => import("@/components/common/Loading"));

const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "product_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowsUpDownIcon
            className="ml-0 h-3 w-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const product = row.original;
      const { id, product_name } = product;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Label className="cursor-pointer">{product_name}</Label>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/product/${id}`}>View</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "category.category_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowsUpDownIcon
            className="ml-0 h-3 w-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </Button>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "is_new",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          New
          <ArrowsUpDownIcon
            className="ml-0 h-3 w-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      return row.getValue("is_new") ? (
        <Badge className="bg-green-500">Yes</Badge>
      ) : (
        <Badge className="bg-red-500">No</Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "is_bestseller",
    header: "Best Seller",
    cell: ({ row }) => {
      return row.getValue("is_bestseller") ? (
        <Badge className="bg-green-500">Yes</Badge>
      ) : (
        <Badge className="bg-red-500">No</Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-center">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     const product = row.original;
  //     const { id } = product;
  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-3 w-3" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>
  //             <Link href={`/admin/product/${id}`}>View</Link>
  //           </DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     );
  //   },
  // },
];

const ProductPage: NextPageWithLayout = () => {
  const { data: products, isLoading } = api.productAdmin.getProducts.useQuery(
    {}
  );

  if (isLoading) return <Loading />;

  return (
    <section className="w-full py-5">
      <DataTable columns={columns} data={products as Product[]} />
    </section>
  );
};

ProductPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProductPage;
