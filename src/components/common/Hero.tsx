import React from "react";
// import Heading from "../product/Heading";
import { Button } from "../ui/button";
import Link from "next/link";
// import HeroAnimation from "./HeroAnimation";
// import HeroAnimation2 from "./HeroAnimation2";
import dynamic from "next/dynamic";
import Loading from "./Loading";

const DynamiAnimation = dynamic(() => import("./HeroAnimation"), {
  ssr: false,
  loading: () => <Loading />,
});

type Props = {};

export default function Hero({}: Props) {
  return (
    <section className="dark:text-gray-100">
      <div className="container mx-auto flex flex-col items-center px-4 py-2 text-center md:px-10 lg:px-32 xl:max-w-5xl">
        <DynamiAnimation />
        <div className="flex flex-wrap justify-center mt-12">
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
