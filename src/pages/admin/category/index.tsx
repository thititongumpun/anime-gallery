import React from "react";
import DataTable from "@/components/common/DataTable";
import Layout from "@/components/common/Layout";
import type { ColumnDef } from "@tanstack/react-table";
import type { NextPageWithLayout } from "@/pages/_app";
import type { Category } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { api } from "@/utils/api";
import Loading from "@/components/common/Loading";

const columns: ColumnDef<Category>[] = [
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
    accessorKey: "category_name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category Name
          <ArrowsUpDownIcon
            className="ml-0 h-3 w-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const category = row.original;
      const { id, category_name } = category;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Label className="cursor-pointer">{category_name}</Label>
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

const CategoryPage: NextPageWithLayout = () => {
  const { data: categories, isLoading } = api.category.getCategories.useQuery();
  if (isLoading) return <Loading />;
  if (!categories) return <>Something went wrong...</>;

  return (
    <section>
      <DataTable columns={columns} data={categories} />
    </section>
  );
};

CategoryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CategoryPage;
