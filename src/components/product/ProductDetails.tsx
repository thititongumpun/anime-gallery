import React from "react";
import type { Product } from "@prisma/client";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCart";
import Price from "../common/Price";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {
  const {data: session} = useSession();
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  return (
    <div className="min-h-128 mx-auto flex h-full w-full max-w-xs flex-col justify-between space-y-4 md:w-1/2">
      <Button onClick={router.back}>Back to products</Button>
      <div>
        <h1 className=" py-2 text-3xl font-extrabold leading-relaxed sm:py-4">
          {product.product_name}
        </h1>
        <p className="text-lg font-medium">{product.description}</p>
        <div className=" px-1 py-4 text-xl font-medium">
          <Price amount={product.amount} />
        </div>
      </div>
      <Button onClick={() => addToCart(product)}>xd</Button>
      <div className="grid grid-cols-2 gap-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">GG</Button>
          </SheetTrigger>
          <SheetContent side={"bottom"}>
            <SheetHeader>
              <SheetTitle>Edit profile</SheetTitle>
              <SheetDescription>
                Review here
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" readOnly/>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value={session?.user.name as string} className="col-span-3" readOnly />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button type="submit">Save changes</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      {/* <ProductForm 
        title={productData.title}
        handle={productData.handle}
        variants={productData.variants.edges} 
        mainImg={productData.images.edges[0].node}
        setVariantPrice={setVariantPrice}
      /> */}
    </div>
  );
}
