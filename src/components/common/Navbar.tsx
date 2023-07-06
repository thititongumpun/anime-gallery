import React from "react";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import DarkModeSwitcher from "./DarkModeSwitcher";
import { Button } from "../ui/button";
import DropdownUser from "./DropdownUser";

export default function Navbar() {
  // const cart = useCartContext()[0]
  // const [cartItems, setCartItems] = useState(0);
  const cartItems = 0;

  // useEffect(() => {
  //   let numItems = 0
  //   cart.forEach(item => {
  //     numItems += item.variantQuantity
  //   })
  //   setCartItems(numItems)
  // }, [cart])
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
          <Link href="/cart" className="relative" aria-label="cart">
            <Button variant="outline" size="icon">
              <ShoppingCartIcon className="m-auto w-6" />
            </Button>
            {cartItems === 0 ? null : (
              <div className="absolute right-0 top-0 -translate-y-3 translate-x-10 transform rounded-full bg-yellow-300 px-2 py-1 text-xs font-semibold text-gray-900">
                {cartItems}
              </div>
            )}
          </Link>
          <DarkModeSwitcher />
          <DropdownUser />
        </div>
      </div>
    </header>
  );
}