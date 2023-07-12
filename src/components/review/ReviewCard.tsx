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
    <div className="flex w-full max-w-5xl flex-col space-x-8 overflow-hidden rounded-lg bg-violet-600 drop-shadow-xl">
      <div className="flex w-full items-center justify-between border-b-2 border-slate-400/20 px-8 py-4 ">
        <div className="flex items-center gap-4">
          <h2 className="text-lg">{author}</h2>
        </div>
        {date.toLocaleDateString('en-US', {}).split(' ')}
      </div>
      <div className="space-y-4  p-4">
        <div className="flex items-start gap-4">
          <div className="w-32">
            <Rating value={rating} itemStyles={reviewStyles} readOnly />
          </div>
        </div>
        <p className="whitespace-break-spaces">{text}</p>
      </div>
    </div>
  );
}
