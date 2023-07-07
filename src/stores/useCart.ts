import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import type { Product } from '@/types/Product';

export type CartState = {
  cart: Product[];
  totalItems: number;
  totalAmount: number;
  numberOfProducts: number;
  addToCart: (product: Product) => void
  removeFromCart: (product: Product) => void
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
                // totalAmount: state.totalAmount + product.amount,
                // numberOfProducts: state.numberOfProducts + 1
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
        }
      }),
      {
        name: "cart-storage"
      }
    )
  )
)

export { useCartStore };