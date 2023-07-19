import React, { useEffect, useState } from "react";
import type { NextPageWithLayout } from "../_app";
import DefaultLayout from "@/components/common/DefaultLayout";
import { useCartStore } from "@/stores/useCart";
import type { Product } from "@prisma/client";
import Price from "@/components/common/Price";
import Image from "next/image";
import { cloudinaryImageLoader } from "@/utils/cloudinary";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

const FormSchema = z.object({
  description: z.string().optional(),
});

const CheckoutPage: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const [cart, totalAmount, createCheckOutSession] = useCartStore((state) => [
    state.cart,
    state.totalAmount,
    state.createCheckOutSession,
  ]);
  const [items, setItem] = useState<Product[]>([]);
  const [totalPrice, setTotalAmount] = useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.success(`Your order has been created!`);
    createCheckOutSession(cart, data.description as string);
  }

  useEffect(() => {
    if (cart) {
      setItem(cart);
      setTotalAmount(totalAmount);
    }
  }, [cart, totalAmount]);

  return (
    <section>
      <h1 className="sr-only">Checkout</h1>

      <div className="mx-auto grid h-full max-w-screen-2xl grid-cols-1 md:grid-cols-2">
        <div className="py-12 md:py-24">
          <div className="mx-auto max-w-lg space-y-8 px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={session?.user.image as string}
                  alt={session?.user.email as string}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <h2 className="font-medium text-gray-900">
                {session?.user.name || session?.user.email}
              </h2>
            </div>

            <div>
              <Price amount={totalPrice} />

              <p className="mt-1 text-sm text-gray-600">For the purchase of</p>
            </div>

            <div>
              <div className="flow-root">
                {items.map((item) => (
                  <ul key={item.id} className="-my-4 divide-y divide-gray-100">
                    <li className="flex items-center gap-4 py-4">
                      <Image
                        loader={cloudinaryImageLoader}
                        src={item.image_url}
                        alt=""
                        width={16}
                        height={16}
                        priority
                        className="h-16 w-16 rounded object-cover"
                      />

                      <div>
                        <h3 className="text-sm text-gray-900">
                          {item.product_name}
                        </h3>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">XXS</dd>
                          </div>

                          <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">White</dd>
                          </div>
                        </dl>
                      </div>
                    </li>
                  </ul>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white py-12 md:py-24">
          <div className="mx-auto max-w-lg px-4 lg:px-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Genshin" {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your Description.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Pay Now</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

CheckoutPage.getLayout = (page: React.ReactElement) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

export default CheckoutPage;
