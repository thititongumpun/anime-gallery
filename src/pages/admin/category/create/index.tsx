import React from "react";
import type { NextPageWithLayout } from "@/pages/_app";
import Layout from "@/components/common/Layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/utils/api";
import { useRouter } from "next/router";

const FormSchema = z.object({
  category_name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

const CreateCategoryPage: NextPageWithLayout = () => {
  const trpc = api.useContext();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category_name: "",
    },
  });

  const { mutateAsync } = api.category.create.useMutation({
    onSuccess: () => {
      toast({
        title: "Category created successfully.",
      });

      void trpc.category.getCategories.invalidate();
      router.back;
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    await mutateAsync(data);
  }
  return (
    <section className="h-screen w-full">
      <div className="flex justify-center">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="category_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Anime" {...field} />
                  </FormControl>
                  <FormDescription>This is your category name.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="inline-flex gap-4">
              <Button type="submit">Submit</Button>
              <Button type="button" variant={"destructive"}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

CreateCategoryPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CreateCategoryPage;
