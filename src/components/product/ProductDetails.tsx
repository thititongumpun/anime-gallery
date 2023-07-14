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
    // <div className="min-h-128 mx-auto flex h-full w-full max-w-xs flex-col justify-between space-y-4 md:w-1/2">
    //   <div>
    //     <h1 className=" py-2 text-3xl font-extrabold leading-relaxed sm:py-4">
    //       {product.product_name}
    //     </h1>
    //     <p className="text-lg font-medium">{product.description}</p>
    //     <div className=" px-1 py-4 text-xl font-medium">
    //       <Price amount={product.amount} />
    //     </div>
    //   </div>

    //   <div className="inline-flex">
    //     <Button
    //       variant={"outline"}
    //       className="rounded-l-lg px-4 py-2 text-sm font-medium focus:z-10"
    //       onClick={() => addToCart(product)}
    //     >
    //       Add to cart
    //     </Button>
    //     <Button
    //       variant={"outline"}
    //       className="rounded-l-lg px-4 py-2 text-sm font-medium focus:z-10"
    //       onClick={router.back}
    //     >
    //       Back
    //     </Button>
    //     <ReviewForm />
    //   </div>
    // </div>
    <div className="sticky top-0 space-y-4">
      {is_new && (
        <strong className="rounded-full border border-blue-600 bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-blue-600">
          New
        </strong>
      )}

      <div className="mt-8 flex justify-between">
        <div className="max-w-[35ch] space-y-2">
          <h1 className="text-xl font-bold sm:text-2xl">{product_name}</h1>

          <p className="text-sm">Highest Rated Product</p>

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
          {/* <div className="-ms-0.5 flex">
            <svg
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>

            <svg
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>

            <svg
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>

            <svg
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>

            <svg
              className="h-5 w-5 text-gray-200"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div> */}
        </div>
        <Price amount={amount} />
      </div>

      <div className="mt-4">
        <div className="prose max-w-none">
          <p>{description}</p>
        </div>
      </div>

      {/* <form className="mt-8">
        <fieldset>
          <legend className="mb-1 text-sm font-medium">Color</legend>

          <div className="flex flex-wrap gap-1">
            <label htmlFor="color_tt" className="cursor-pointer">
              <input
                type="radio"
                name="color"
                id="color_tt"
                className="peer sr-only"
              />

              <span className="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                Texas Tea
              </span>
            </label>

            <label htmlFor="color_fr" className="cursor-pointer">
              <input
                type="radio"
                name="color"
                id="color_fr"
                className="peer sr-only"
              />

              <span className="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                Fiesta Red
              </span>
            </label>

            <label htmlFor="color_cb" className="cursor-pointer">
              <input
                type="radio"
                name="color"
                id="color_cb"
                className="peer sr-only"
              />

              <span className="group inline-block rounded-full border px-3 py-1 text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                Cobalt Blue
              </span>
            </label>
          </div>
        </fieldset>

        <fieldset className="mt-4">
          <legend className="mb-1 text-sm font-medium">Size</legend>

          <div className="flex flex-wrap gap-1">
            <label htmlFor="size_xs" className="cursor-pointer">
              <input
                type="radio"
                name="size"
                id="size_xs"
                className="peer sr-only"
              />

              <span className="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                XS
              </span>
            </label>

            <label htmlFor="size_s" className="cursor-pointer">
              <input
                type="radio"
                name="size"
                id="size_s"
                className="peer sr-only"
              />

              <span className="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                S
              </span>
            </label>

            <label htmlFor="size_m" className="cursor-pointer">
              <input
                type="radio"
                name="size"
                id="size_m"
                className="peer sr-only"
              />

              <span className="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                M
              </span>
            </label>

            <label htmlFor="size_l" className="cursor-pointer">
              <input
                type="radio"
                name="size"
                id="size_l"
                className="peer sr-only"
              />

              <span className="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                L
              </span>
            </label>

            <label htmlFor="size_xl" className="cursor-pointer">
              <input
                type="radio"
                name="size"
                id="size_xl"
                className="peer sr-only"
              />

              <span className="group inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs font-medium peer-checked:bg-black peer-checked:text-white">
                XL
              </span>
            </label>
          </div>
        </fieldset>

        <div className="mt-8 flex gap-4">
          <div>
            <label htmlFor="quantity" className="sr-only">
              Qty
            </label>

            <input
              type="number"
              id="quantity"
              min="1"
              value="1"
              className="w-12 rounded border-gray-200 py-3 text-center text-xs [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            />
          </div>

          <button
            type="submit"
            className="block rounded bg-green-600 px-5 py-3 text-xs font-medium text-white hover:bg-green-500"
          >
            Add to Cart
          </button>
        </div>
      </form> */}
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
