"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import type { Category, Product } from "@/types/Product";
import Link from "next/link";
import ConfirmDialog from "./ConfirmDialog";
import { useState } from "react";
import { api } from "@/utils/api";
// import { toast } from "../ui/use-toast";
import { Label } from "../ui/label";
import toast from "react-hot-toast";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  categories: Category[];
}

export function DataTableToolbar<TData>({
  table,
  categories,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const trpc = api.useContext();
  const deleteProduct = api.productAdmin.delete.useMutation({
    onSuccess(data) {
      toast.success(`${data.product_name} has been deleted.`)
      void trpc.productAdmin.getProducts.invalidate();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const arraySelectedProductId = table
    .getSelectedRowModel()
    .rows.map(({ original }) => (original as Product).id);

  const [confirmOpen, setConfirmOpen] = useState(false);

  if (!categories) return <>Something went wrong...</>;

  const handleDelete = (id: string[]) => {
    if (id.length > 0) {
      id.map(async (id) => await deleteProduct.mutateAsync({ id: id }));
    }
  };
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter products..."
          value={
            (table.getColumn("product_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("product_name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category_category_name") && (
          <DataTableFacetedFilter
            column={table.getColumn("category_category_name")}
            title="Category"
            options={categories}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="m-2 flex items-center p-2">
        <div className="ml-auto flex space-x-2 md:flex-1 md:space-x-5">
          <Button className="">
            <Link href="/admin/product/create">Create</Link>
          </Button>
          <Button onClick={() => setConfirmOpen(true)} variant="destructive">
            Delete
          </Button>
          <ConfirmDialog
            title="Delete Product ?"
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={() => handleDelete(arraySelectedProductId)}
          >
            <Label>
              Are you sure you want to delete? {arraySelectedProductId.length}{" "}
              products
            </Label>
          </ConfirmDialog>
        </div>
      </div>
    </div>
  );
}
