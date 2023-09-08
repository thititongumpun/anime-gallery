import { Button } from "@/components/ui/button";
import { cloudinaryImageLoader } from "@/utils/cloudinary";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

export default function NotFoundPage({}: Props) {
  const router = useRouter();
  return (
    <main>
      <div className="mx-auto flex h-screen max-w-screen-xl items-center justify-start px-4 md:px-8">
        <div className="mx-auto max-w-lg flex-row-reverse items-center justify-between gap-12 md:flex md:max-w-none">
          <div className="mt-12 max-w-lg flex-1 space-y-3 md:mt-0">
            <Image
              loader={cloudinaryImageLoader}
              src="anime/bbwmskv8idhifsgakvba.jpg"
              alt="not found"
              width={800}
              height={800}
              priority
            />
            <Button
              variant={"link"}
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-x-1 bg-indigo-600 font-medium text-white duration-150 hover:text-indigo-400 dark:text-white"
            >
              Go back
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path
                  fillRule="evenodd"
                  d="M5 10a.75.75 0 01.75-.75h6.638L10.23 7.29a.75.75 0 111.04-1.08l3.5 3.25a.75.75 0 010 1.08l-3.5 3.25a.75.75 0 11-1.04-1.08l2.158-1.96H5.75A.75.75 0 015 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
