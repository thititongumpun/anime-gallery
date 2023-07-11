import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import dynamic from "next/dynamic";
import Loading from "./Loading";
import AnimatedTextCharacter from "./AnimatedText";

const DynamiAnimation = dynamic(() => import("./HeroAnimation"), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Hero() {
  return (
    <section className="dark:text-gray-100">
      <div className="m-5 mx-auto flex flex-col items-center space-y-5 px-4 py-2 text-center md:px-10 lg:px-32 xl:max-w-7xl">
        <AnimatedTextCharacter text="Gallery" />
        <DynamiAnimation />
        <div className="mt-12 flex flex-wrap justify-center">
          <Button
            variant="link"
            className="m-2 rounded border px-4 py-4 text-lg font-semibold shadow-md dark:bg-violet-400 dark:text-gray-900"
          >
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
