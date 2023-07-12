import React, { useState } from "react";
import { api } from "@/utils/api";
import ReviewCard from "./ReviewCard";
import Loading from "../common/Loading";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

type Props = {};

export default function ProductReview({}: Props) {
  const router = useRouter();
  const { id } = router.query;
  const [page, setPage] = useState(0);

  const { data, fetchNextPage, isLoading, isFetchingNextPage } =
    api.review.getReviewsBatch.useInfiniteQuery(
      {
        productId: id as string,
        limit: 6,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const handleFetchNextPage = () => {
    void fetchNextPage();
    setPage((prev) => prev + 1);
  };

  const handleFetchPreviousPage = () => {
    setPage((prev) => prev - 1);
  };

  const toShow = data?.pages[page]?.items;
  const nextCursor = data?.pages[page]?.nextCursor;

  return (
    <div className="mt-5 flex h-fit flex-col place-items-center justify-center gap-6 p-2">
      <h4 className="w-fit rounded-md bg-slate-200 px-4 py-1 font-semibold shadow-md drop-shadow-sm dark:text-black md:ml-4">
        Reviews
      </h4>
      {isLoading || (isFetchingNextPage && !toShow) ? (
        <>
          <Loading />
        </>
      ) : null}
      <div className="mx-auto flex items-center justify-between gap-8">
        {page > 0 && (
          <button className="" type="button" onClick={handleFetchPreviousPage}>
            <ArrowLeftIcon className="h-6 w-6" />
          </button>
        )}
        <div className="mx-auto grid max-w-5xl auto-cols-max grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-8">
          {!isLoading &&
            toShow?.map((review) => (
              <ReviewCard
                key={review.id}
                author={review.username}
                date={review.date}
                text={review.message}
                rating={review.rating}
              />
            ))}
        </div>
        {nextCursor && (
          <button className="" type="button" onClick={handleFetchNextPage}>
            <ArrowRightIcon className="h-6 w-6" />
          </button>
        )}
      </div>
    </div>
  );
}
