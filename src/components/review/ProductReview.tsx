import React from "react";
import ReviewCard from "./ReviewCard";

type Props = {};

const reviews = [
  {
    id: "1",
    username: "john doe",
    rating: 5,
    date: new Date(),
    message: "its cool 1",
  },
  {
    id: "2",
    username: "john doe",
    rating: 3,
    date: new Date(),
    message: "its cool 2",
  },
  {
    id: "3",
    username: "john doe",
    rating: 4,
    date: new Date(),
    message: "its cool 3",
  },
  {
    id: "4",
    username: "john doe",
    rating: 4,
    date: new Date(),
    message:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit maiores iste quibusdam pariatur ad, dolorem omnis! Ullam similique cumque, repellat voluptas eius obcaecati beatae quia explicabo ipsa placeat at praesentium?",
  },
];

export default function ProductReview({}: Props) {
  return (
    <div className="mt-5 flex h-fit flex-col place-items-center justify-center gap-6 p-2">
      <h4 className="w-fit rounded-md bg-slate-200 px-4 py-1 font-semibold shadow-md drop-shadow-sm dark:text-black md:ml-4">
        Reviews
      </h4>
      <div className="mx-auto grid max-w-7xl auto-cols-max grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            author={review.username}
            date={review.date}
            text={review.message}
            rating={review.rating}
          />
        ))}
      </div>
    </div>
  );
}
