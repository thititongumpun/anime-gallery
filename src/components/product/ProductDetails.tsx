import React from "react";
import type { Product } from "@prisma/client";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/useCart";
import Price from "../common/Price";
import { useRouter } from "next/router";
import ReviewForm from "../review/ReviewForm";
import ProductReview from "../review/ProductReview";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import { api } from "@/utils/api";

type Props = {
  product: Product;
};

export default function ProductDetails({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();
  const { product_name, description, amount, is_new } = product;
  const { id } = router.query;
  const { data: reviews } = api.review.getReviews.useQuery(
    {
      productId: id as string,
    },
    {
      enabled: !!id,
    }
  );

  if (!reviews) return <div>Something went wrong!!!</div>;

  const rating = Math.round(
    reviews?.reduce((acc, review) => acc + review.rating, 0) / reviews?.length
  );

  return (
    <div className="sticky top-0 space-y-4">
      {is_new && (
        <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
          New
        </strong>
      )}

      <div className="mt-8 flex justify-between">
        <div className="max-w-[35ch] space-y-2">
          <h1 className="text-xl font-bold sm:text-2xl">{product_name}</h1>

          {rating === 5 && <p className="text-sm">Highest Rated Product</p>}

          <div className="w-24">
            <Rating
              value={rating || 0}
              itemStyles={{
                itemShapes: RoundedStar,
                activeFillColor: "#ffb700",
                inactiveFillColor: "#d1e2eb",
              }}
              readOnly
            />
          </div>
        </div>
        <Price amount={amount} />
      </div>

      <div className="mt-4">
        <div className="prose max-w-none">
          <p>{description}</p>
        </div>
      </div>
      <div className="inline-flex space-x-4">
        <Button
          variant={"outline"}
          className="text-smfont-medium rounded-l-lg px-4 py-2 focus:z-10"
          onClick={() => addToCart(product)}
        >
          Add to cart
        </Button>
        <Button
          variant={"outline"}
          className="rounded-l-lg px-4 py-2 text-sm font-medium focus:z-10"
          onClick={router.back}
        >
          Back
        </Button>
        <ReviewForm />
      </div>

      <ProductReview />
    </div>
  );
}
