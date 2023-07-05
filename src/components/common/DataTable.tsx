"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { useRouter } from "next/router";
import type { Product } from "@/types/Product";
import { api } from "@/utils/api";
import { toast } from "../ui/use-toast";
import ConfirmDialog from "./ConfirmDialog";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { pathname } = useRouter();
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const trpc = api.useContext();
  const deleteProduct = api.product.delete.useMutation({
    onSuccess(data) {
      toast({
        title: "Delete Success",
        description: `${data.product_name} has been deleted.`,
      });
    },
    onSettled: async () => {
      await trpc.product.getProducts.invalidate();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const table = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageSize: 10 } },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const arraySelectedProductId = table
    .getSelectedRowModel()
    .rows.map(({ original }) => (original as Product).id);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = (id: string[]) => {
    if (id.length > 0) {
      id.map(async (id) => await deleteProduct.mutateAsync({ id: id }));
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {pathname === "/admin/product" && (
          <Input
            placeholder="Filter products..."
            value={
              (table.getColumn("product_name")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("product_name")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        <div className="ml-auto flex space-x-2 md:flex-1 md:space-x-5">
          <Button className="">
            <Link href="/admin/product/create">Create</Link>
          </Button>
          <Button onClick={() => setConfirmOpen(true)} className="bg-red-500">
            Delete
          </Button>
          <ConfirmDialog
            title="Delete Product ?"
            open={confirmOpen}
            onClose={() => setConfirmOpen(false)}
            onConfirm={() => handleDelete(arraySelectedProductId)}
          >
            Are you sure you want to delete?
          </ConfirmDialog>
        </div>
      </div>
      <div className="rounded-md border">
        <Table className="w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <span className="font-bold">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
