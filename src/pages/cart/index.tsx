import React from "react";
import type { NextPageWithLayout } from "../_app";
import DefaultLayout from "@/components/common/DefaultLayout";
import CartTable from "@/components/cart/CartTable";
import { useCartStore } from "@/stores/useCart";

const CartPage: NextPageWithLayout = () => {
  const cart = useCartStore(state => state.cart);
  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <h1 className="font-primary mt-4 py-2 text-center text-4xl font-extrabold leading-relaxed text-purple-500 sm:py-4">
        Your Cart
      </h1>
      <CartTable products={cart} />
    </div>
  );
};

CartPage.getLayout = function (page: React.ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default CartPage;
