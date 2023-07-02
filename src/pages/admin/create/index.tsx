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
import ImageUpload from "@/components/ui/ImageUpload";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/router";
import type { UploadApiErrorResponse } from "cloudinary";

const formSchema = z.object({
  product_name: z
    .string({ required_error: "Please input Product Name" })
    .min(2)
    .max(50),
  categoryId: z.string({ required_error: "Please select Category" }),
  description: z
    .string()
    .min(5, {
      message: "Description must be at least 5 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 160 characters.",
    }),
  image_url: z.string({ required_error: "Please upload image" }),
});

export default function CreateProductPage() {
  const router = useRouter();
  const { data: categories } = api.category.getCategorys.useQuery();

  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const submit = api.product.create.useMutation({
    onSuccess(newData) {
      console.log(newData);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      description: "",
      image_url: imageUrl,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    submit.mutate({
      categoryId: values.categoryId,
      product_name: values.product_name,
      description: values.description,
      image_url: imageUrl,
    });
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  function handleWidgetClick() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "defvbtczt",
        uploadPreset: "p0yhanvl",
        apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        resourceType: "image",
        multiple: false,
        cropping: true,
        sources: [
          "local",
          "url",
          "camera",
          "dropbox",
          "unsplash",
          "google_drive",
        ],
      },
      (error: UploadApiErrorResponse, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          setIsImageUploaded(true);
          setImageUrl(result.info.secure_url);
        } else if (error) {
          console.log(error);
        }
      }
    );
    widget.open();
  }

  return (
    <section className="h-screen bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-white p-8 shadow-lg lg:col-span-3 lg:p-12">
          <Form {...form}>
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
              <ImageUpload onClick={handleWidgetClick} />
              {isImageUploaded ? (
                <>
                  <div>Successfully uploaded</div>
                </>
              ) : null}
              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem className="hidden">
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
              <Button type="submit">Submit</Button>
            </form>
          </Form>
          <Button variant="destructive" onClick={router.back}>
            Cancel
          </Button>
        </div>
      </div>
    </section>
  );
}
