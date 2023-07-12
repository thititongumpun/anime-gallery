import React from "react";
import ReviewCard from "./ReviewCard";
import { api } from "@/utils/api";
import Loading from "../common/Loading";
import { useRouter } from "next/router";

type Props = {};

export default function ProductReview({}: Props) {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = api.review.getReviews.useQuery({
    productId: id as string,
  });
  console.log(data);
  if (isLoading) return <Loading />;
  if (!data) return <>Something went Wrong</>;
  return (
    <div className="mt-5 flex h-fit flex-col place-items-center justify-center gap-6 p-2">
      <h4 className="w-fit rounded-md bg-slate-200 px-4 py-1 font-semibold shadow-md drop-shadow-sm dark:text-black md:ml-4">
        Reviews
      </h4>
      <div className="mx-auto grid max-w-7xl auto-cols-max grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {data.map((review) => (
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
