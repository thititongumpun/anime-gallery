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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/utils/firebase";
import { Progress } from "@/components/ui/progress";
import Layout from "@/components/common/Layout";

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
  amount: z.coerce.number({ required_error: "Please input amount" }).min(1),
  image_url: z.string({ required_error: "Please upload image" }),
});

export default function CreateProductPage() {
  const router = useRouter();
  const { data: categories } = api.category.getCategories.useQuery();
  const [imageFile, setImageFile] = useState<File>();
  const [downloadURL, setDownloadURL] = useState("");
  const [progressUpload, setProgressUpload] = useState(0);

  const submit = api.product.create.useMutation({
    onSuccess() {
      toast({
        title: "Create Success",
        description: "Product has been created.",
      });
      router.back();
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      product_name: "",
      description: "",
      amount: 0,
      image_url: downloadURL,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // uploadToFirebase();
    await submit.mutateAsync({
      categoryId: values.categoryId,
      product_name: values.product_name,
      description: values.description,
      amount: values.amount,
      image_url: downloadURL,
    });
  }

  const handleSelectedFile = (files: FileList | null) => {
    if (files) {
      setImageFile(files[0]);
    } else {
      console.error("no file selected");
    }
  };

  const uploadToFirebase = () => {
    if (imageFile) {
      const name = imageFile.name;
      const storageRef = ref(storage, `gallery/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setProgressUpload(progress); // to show progress upload

          switch (snapshot.state) {
            case "paused":
              toast({
                title: "Paused",
                description: "Upload is paused",
              });
              break;
            case "running":
              toast({
                title: "Running",
                description: "Upload is running",
              });
              break;
          }
        },
        (error) => {
          console.error(error.message);
        },
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadURL(url);
          });
          toast({
            title: "Success",
            description: "upload successful",
          });
        }
      );
    } else {
      toast({
        title: "Error",
        description: "upload error",
      });
    }
  };

  return (
    <Layout>
      <section className="h-screen">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg p-8 shadow-lg lg:col-span-3 lg:p-12">
            <div className="flex">
              <Input
                type="file"
                onChange={(files) => handleSelectedFile(files.target.files)}
                className="grid w-full max-w-sm items-center gap-1.5"
              />
              <Button onClick={uploadToFirebase}>Upload</Button>
            </div>
            <div className="mt-5">
              {imageFile && (
                <div className="mt-3 text-center">
                  <Progress value={progressUpload} />
                </div>
              )}
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                <FormField
                  control={form.control}
                  name="image_url"
                  render={({ field }) => (
                    <FormItem className="hidden">
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="IMAGEURL" {...field} />
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
    </Layout>
  );
}
