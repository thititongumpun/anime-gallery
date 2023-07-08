import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { Button } from "../ui/button";
import DropdownUser from "./DropdownUser";
import { useCartStore } from "@/stores/useCart";
import Carts from "../cart/Carts";

export default function Navbar() {
  const numberOfProducts = useCartStore((state) => state.numberOfProducts);
  const [cartItems, setCartItems] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCartItems(numberOfProducts);
  }, [numberOfProducts]);

  return (
    <header className="sticky top-0 z-20 border border-b bg-white shadow-lg dark:bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 pb-2 pt-4 md:pt-6">
        <Link href="/">
          <h1 className="flex no-underline">
            <Image
              height={32}
              width={32}
              src="/logo.png"
              alt="logo"
              className="mr-1 h-8 w-8 object-contain"
            />
            <span className="pl-3 text-xl font-bold tracking-wide">
              Gallery
            </span>
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Button variant="outline" size="icon">
              <ShoppingCartIcon
                className="m-auto w-6"
                onClick={() => setOpen(true)}
              />
              <Carts open={open} setOpen={setOpen} />
            </Button>
            {cartItems === 0 ? null : (
              <div className="absolute right-6 top-0 -translate-y-3 translate-x-10 transform rounded-full bg-yellow-300 px-2 py-1 text-xs font-semibold text-gray-900">
                {numberOfProducts}
              </div>
            )}
          </div>
          <DarkModeSwitcher />
          <DropdownUser />
        </div>
      </div>
    </header>
  );
}
