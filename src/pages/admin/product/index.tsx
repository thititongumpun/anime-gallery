import { api } from "@/utils/api";
import React, { useState } from "react";
import Layout from "@/components/common/Layout";
import Loading from "@/components/common/Loading";
import DataTable from "@/components/common/DataTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import type { ColumnDef } from "@tanstack/react-table";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { NextPageWithLayout } from "@/pages/_app";

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

const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
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
  },
  {
    accessorKey: "is_new",
    header: "New",
    cell: ({ row }) => {
      return row.getValue("is_new") ? (
        <Badge className="bg-green-500">Yes</Badge>
      ) : (
        <Badge className="bg-red-500">No</Badge>
      );
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
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("th-TH", {
        style: "currency",
        currency: "THB",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      const { id } = product;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
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
];

const ProductPage: NextPageWithLayout = () => {
  const { data: categories, isLoading: isCategoryLoading } =
    api.category.getCategories.useQuery();
  const [value, setValue] = useState("");
  const { data: products, isLoading } = api.productAdmin.getProducts.useQuery({
    categoryId: value || "",
  });

  if (isLoading) return <Loading />;
  if (isCategoryLoading) return <Loading />;
  if (!categories) return <>something went wrong</>;

  return (
    <section className="container mx-auto py-10">
      <Select onValueChange={(e) => setValue(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category</SelectLabel>
            {categories.map((item) => (
              <SelectItem key={item.id} value={item.id}>
                {item.category_name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <DataTable columns={columns} data={products as Product[]} />
    </section>
  );
};

ProductPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default ProductPage;
