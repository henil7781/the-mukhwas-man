import { create } from 'zustand';

interface Product {
  id: number;
  title: string;
  price: string;
  image: string;
  category: string;
  benefit: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void; // New Action
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isCartOpen: false,

  setIsCartOpen: (open) => set({ isCartOpen: open }),

  addItem: (product) => 
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);
      let newItems;
      if (existingItem) {
        newItems = state.items.map((item) =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity: 1 }];
      }
      return { items: newItems, isCartOpen: true };
    }),

  removeItem: (id) => 
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  // Logic to handle plus/minus buttons
  updateQuantity: (id, delta) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      ),
    })),

  clearCart: () => set({ items: [] }),
}));