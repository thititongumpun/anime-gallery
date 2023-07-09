import React from "react";
import Heading from "../product/Heading";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

export default function Hero({}: Props) {
  return (
    <section className="dark:text-gray-100">
      <div className="container mx-auto flex flex-col items-center px-4 py-16 text-center md:px-10 lg:px-32 xl:max-w-3xl">
        <Heading open={true}>
          <h1 className="mx-auto p-2 text-center text-3xl font-extrabold leading-relaxed">
            Get Image Collections
          </h1>
          <p className="mx-auto max-w-xl px-2 text-center text-base">
            Times are tough. Liven up your home with some cute Doggy Stickers.
            🐶
          </p>
        </Heading>
        <div className="flex flex-wrap justify-center">
          <Button
            variant="link"
            className="m-2 rounded border px-8 py-7 text-lg font-semibold shadow-md dark:bg-violet-400 dark:text-gray-900"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
          <button className="m-2 rounded border px-8 py-3 text-lg dark:border-gray-700 dark:text-gray-50">
            Learn more
          </button>
        </div>
      </div>
    </section>
  );
}
