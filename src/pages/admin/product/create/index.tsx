import { Input } from "@/components/ui/input";
import { api } from "@/utils/api";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import Layout from "@/components/common/Layout";
import type { NextPageWithLayout } from "@/pages/_app";
import axios from "axios";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  product_name: z
    .string({ required_error: "Please input Product Name" })
    .min(2)
    .max(50),
  categoryId: z.string({ required_error: "Please select Category" }),
  description: z
    .string()
    .min(3, {
      message: "Description must be at least 5 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 160 characters.",
    }),
  amount: z.coerce.number({ required_error: "Please input amount" }).min(1),
  image:
    typeof window === "undefined"
      ? z.undefined()
      : z
          .instanceof(FileList)
          .refine(
            (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type || ""),
            ".jpg, .jpeg, .png and .webp files are accepted."
          ),
});

const CreateProductPage: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: categories } = api.category.getCategories.useQuery();
  const [progressUpload, setProgressUpload] = useState(0);
  const [secureUrl, setSecureUrl] = useState<string>("");
  const trpc = api.useContext();
  const submit = api.productAdmin.create.useMutation({
    onSuccess() {
      toast({
        title: "Create Success",
        description: "Product has been created.",
      });
      void trpc.productAdmin.getProducts.invalidate();
      router.back();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      description: "",
      amount: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await submit.mutateAsync({
      categoryId: values.categoryId,
      product_name: values.product_name,
      description: values.description,
      amount: values.amount,
      image_url: secureUrl,
    });
  }

  const onUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const formData = new FormData();
    formData.append("upload_preset", "dkerrk7j");
    formData.append(
      "api_key",
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || ""
    );
    formData.append("file", e.target.files?.[0] || "");

    const config = {
      onUploadProgress: (e: any) => {
        const { loaded, total } = e;
        setProgressUpload(Math.round((loaded / total) * 100));
      },
    };

    try {
      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ""
        }/image/upload`,
        formData,
        config
      );
      setSecureUrl(data.public_id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="h-screen w-full">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg p-8 shadow-lg lg:col-span-3 lg:p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="image"
                render={({}) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        {...form.register("image")}
                        onChange={onUploadFile}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your product display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {progressUpload > 0 && (
                <div className="flex h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="flex flex-col justify-center overflow-hidden bg-blue-500 text-center text-xs text-white"
                    style={{ width: `${progressUpload}%` }}
                    role="progressbar"
                    aria-valuenow={progressUpload}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    {progressUpload}%
                  </div>
                </div>
              )}
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Naruto" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your product display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is your product category.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description...." {...field} />
                    </FormControl>
                    <FormDescription>Description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your product amount.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Button type="submit" disabled={secureUrl === "" ? true : false}>Submit</Button> */}
              {form.formState.isSubmitting ? (
                <div>Submiting...</div>
              ) : (
                <Button>Submit</Button>
              )}
            </form>
          </Form>

          {/* <div className="flex">
            <Input
              type="file"
              onChange={(files) => handleSelectedFile(files.target.files)}
              className="grid w-full max-w-sm items-center gap-1.5"
            />
            <Button onClick={uploadToFirebase}>Upload</Button>
          </div>
          <div className="mt-5">
            {imageFile && (
              <div className="flex h-4 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                <div
                  className="flex flex-col justify-center overflow-hidden bg-blue-500 text-center text-xs text-white"
                  style={{ width: `${progressUpload}%` }}
                  role="progressbar"
                  aria-valuenow={progressUpload}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  {progressUpload}%
                </div>
              </div>
            )}
          </div> */}
          {/* <Form {...form}>
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input type="file" placeholder="IMAGEURL" />
                  </FormControl>
                  <FormDescription>
                    This is your product display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="product_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Naruto" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your product display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.category_name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      This is your product category.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description...." {...field} />
                    </FormControl>
                    <FormDescription>Description</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your product amount.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form> */}
          <Button variant="destructive" onClick={router.back}>
            Cancel
          </Button>
        </div>
      </div>
    </section>
  );
};

CreateProductPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

export default CreateProductPage;
