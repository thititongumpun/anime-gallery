import React from "react";

import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  rating: z.coerce.number().min(1, {
    message: "Rating must be at least 1.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
});

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Textarea } from "../ui/textarea";
import { Rating } from "@smastrom/react-rating";
import { useRouter } from "next/router";
import { api } from "@/utils/api";

export default function ReviewForm() {
  const router = useRouter();
  const { id } = router.query;
  const trpc = api.useContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      message: "",
      rating: 0,
    },
  });

  const submit = api.review.createReview.useMutation({
    onSuccess() {
      toast({
        title: "Create Success",
        description: "Review has be created.",
      });

      void trpc.review.invalidate();
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const req = {
      productId: id as string,
      username: data.username,
      rating: data.rating,
      message: data.message,
    };

    await submit.mutateAsync(req);
  }
  return (
    <div className="flex items-center justify-center gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full">
            Review Product
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>New review</SheetTitle>
            <SheetDescription>Review here</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex w-full flex-col items-center justify-center gap-4"
              >
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel id="rating_label">Rating</FormLabel>
                      <Rating
                        value={field.value}
                        isRequired
                        onChange={field.onChange}
                        visibleLabelId="rating_label"
                        onBlur={field.onBlur}
                        style={{ maxWidth: 180 }}
                      />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <SheetFooter>
                  <Button type="submit">Submit</Button>
                </SheetFooter>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
