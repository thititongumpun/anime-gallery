import React from "react";
import { Rating, RoundedStar } from "@smastrom/react-rating";

type Props = {
  author: string | null;
  date: Date;
  text: string;
  rating: number;
};

const reviewStyles = {
  itemShapes: RoundedStar,
  activeFillColor: "#ffb700",
  inactiveFillColor: "#d1e2eb",
};

export default function ReviewCard({ author, date, text, rating }: Props) {
  return (
    <div className="flex w-full flex-col space-x-8 overflow-hidden rounded-lg bg-slate-200 shadow-lg drop-shadow-xl dark:text-black">
      <div className="flex w-full flex-col items-start justify-between gap-4 border-b-2 border-slate-400/20 px-8 py-4 md:flex-row">
        <div className="flex items-center gap-4">
          <h2 className="text-transform: text-md capitalize">{author}</h2>
        </div>
        {date.toLocaleDateString("en-US", {}).split(" ")}
      </div>
      <div className="m-2 space-y-4 p-2">
        <div className="w-24">
          <Rating value={rating} itemStyles={reviewStyles} readOnly />
        </div>
        <p className="whitespace-break-spaces break-all duration-100">{text}</p>
      </div>
    </div>
  );
}
