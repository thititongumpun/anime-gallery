import React from "react";
import Layout from "@/components/common/Layout";
import type { NextPageWithLayout } from "@/pages/_app";
import { api } from "@/utils/api";
import DataTable from "@/components/common/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowsUpDownIcon } from "@heroicons/react/24/outline";
// import type { Account, User } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Loading from "@/components/common/Loading";
import type { Account } from "@/types/Account";

const columns: ColumnDef<Account>[] = [
  {
    accessorKey: "user.name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-fit"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowsUpDownIcon
            className="ml-0 h-3 w-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          />
        </Button>
      );
    },
    cell: ({ row }) => {
      const account = row.original;
      const { id, name } = account.user;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Label className="cursor-pointer">{name}</Label>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/admin/user/${id}`}>View</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "user.email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
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
    accessorKey: "provider",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Provider
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
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const account = row.original;
      const { role } = account.user;
      return role === "ADMIN" ? (
        <Badge className="bg-green-500">{role}</Badge>
      ) : (
        <Badge className="bg-red-500">{role}</Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];

const UserPage: NextPageWithLayout = () => {
  // const { data: users, isLoading } = api.user.getUsers.useQuery();
  const { data: accounts, isLoading } = api.user.getAccounts.useQuery();
  if (isLoading) return <Loading />;
  if (!accounts) return <div>Something went wrong...</div>;
  return (
    <section>
      <DataTable columns={columns} data={accounts as Account[]}></DataTable>
    </section>
  );
};

UserPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default UserPage;
