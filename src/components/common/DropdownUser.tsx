import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { UserCircleIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function DropdownUser() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage
                  src={session?.user.image as string}
                  alt={session?.user.email as string}
                />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {session.user.role === "ADMIN" && (
              <DropdownMenuItem className="flex cursor-pointer items-center">
                <UserCircleIcon className="mr-2 h-4 w-4" />
                <Link href="/admin">Admin</Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex cursor-pointer items-center">
              <UserCircleIcon className="mr-2 h-4 w-4" />
              <Link href="/order">Your Order</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex cursor-pointer items-center"
              onClick={() => void signOut({ callbackUrl: "/" })}
            >
              <LockClosedIcon className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button onClick={() => void signIn()}>Sign In</Button>
      )}
    </>
  );
}
