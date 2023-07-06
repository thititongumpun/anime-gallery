export type Product = {
  id: string;
  categoryId: string | null;
  product_name: string;
  description: string;
  amount: number;
  is_new: boolean;
  is_bestseller: boolean;
  image_url: string;
  publishedAt: Date;
  publishedBy: string;
  updatedAt: Date;
};

export type Category = {
  id: string;
  category_name: string;
}