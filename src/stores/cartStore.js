import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: [],
  totalAmount: 0,

  // Add Item with validation for price and quantity
  addItem: (item) =>
    set((state) => {
      // Ensure valid price and quantity before adding to the cart
      if (
        isNaN(item.price) ||
        item.price <= 0 ||
        isNaN(item.quantity) ||
        item.quantity <= 0
      ) {
        console.error("Invalid price or quantity for item:", item);
        return state; // Do not update if price or quantity is invalid
      }

      const updatedItems = [...state.items, item];
      const total = updatedItems.reduce(
        (sum, item) =>
          sum +
          (isNaN(item.price) ? 0 : item.price) *
            (isNaN(item.quantity) ? 0 : item.quantity),
        0
      );
      return { items: updatedItems, totalAmount: total };
    }),

  // Remove Item with validation
  removeItem: (itemId) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== itemId);
      const total = updatedItems.reduce(
        (sum, item) =>
          sum +
          (isNaN(item.price) ? 0 : item.price) *
            (isNaN(item.quantity) ? 0 : item.quantity),
        0
      );
      return { items: updatedItems, totalAmount: total };
    }),

  // Clear Cart
  clearCart: () => set({ items: [], totalAmount: 0 }),
}));
