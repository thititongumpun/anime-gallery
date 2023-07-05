import React from "react";
import { Label } from "../ui/label";

export default function Heading() {
  return (
    <section className="flex flex-col items-center justify-center">
      <Label className="mt-4 py-2 text-center font-sans text-4xl font-extrabold leading-relaxed sm:py-4">
        Get Image Collection
      </Label>
      <p className="mx-auto max-w-xl px-2 text-center text-base text-gray-600">
        Times are tough. Liven up your home with some cute Doggy Stickers. 🐶
      </p>
    </section>
  );
}
