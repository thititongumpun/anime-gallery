import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Product } from '@/types/Product';
import getStripe from '@/utils/stripe';
import axios from 'axios';

export type CartState = {
  cart: Product[];
  totalItems: number;
  totalAmount: number;
  numberOfProducts: number;
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
  clearCart: () => void
  createCheckOutSession: (product: Product[], description: string) => void
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set) => ({
        cart: [],
        totalItems: 0,
        totalAmount: 0,
        numberOfProducts: 0,
        addToCart: product => {
          set(state => {
            const alreadyAdded = state.cart.some(entry => entry.product_name === product.product_name);
            if (alreadyAdded)
              return {
                ...state,
              };

            return {
              ...state,
              cart: [...state.cart, product],
              totalAmount: state.totalAmount + product.amount,
              numberOfProducts: state.numberOfProducts + 1
            };
          });
        },
        removeFromCart: product => {
          set(state => ({
            ...state,
            cart: state.cart.filter(item => item.id !== product.id),
            totalAmount: state.totalAmount - product.amount,
            numberOfProducts: state.numberOfProducts - 1
          }));
        },
        clearCart: () => {
          set({
            cart: [],
            totalItems: 0,
            totalAmount: 0,
            numberOfProducts: 0
          });
        },
        createCheckOutSession: async (products, description) => {
          const stripe = await getStripe();
          const line_items = products.map((product) => ({
            price_data: {
              currency: "THB",
              unit_amount: Math.floor(product.amount) * 100,
              product_data: {
                name: product.product_name,
                description: product.description,
                images: [`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string}/image/upload/${product.image_url}`],
              },
            },
            quantity: 1,
          }))

          const productId = products.map((product) => product.id);

          const obj = {
            line_items,
            description,
            productId
          }

          const checkoutSession = await axios.post(
            "/api/checkout_sessions",
            obj
          );

          const result = await stripe?.redirectToCheckout({
            sessionId: checkoutSession.data.id,
          });

          if (result?.error) {
            alert(result?.error.message);
          }
        }
      }),
      {
        name: "cart-storage"
      }
    )
  )
)

export { useCartStore };