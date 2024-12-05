import { create } from "zustand";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../api/order";

export const useOrderStore = create((set) => ({
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await getOrders();
      set({ orders, loading: false });
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch orders";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  createOrder: async (orderData) => {
    set({ loading: true, error: null });
    try {
      const order = await createOrder(orderData);
      set((state) => ({ orders: [...state.orders, order], loading: false }));
      return order;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to create order";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  getOrderById: async (id) => {
    set({ loading: true, error: null });
    try {
      const order = await getOrderById(id);
      set({ currentOrder: order, loading: false });
      return order;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to fetch order";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },

  updateOrderStatus: async (id, status) => {
    set({ loading: true, error: null });
    try {
      // Call the API to update the status of the order
      const updatedOrder = await updateOrderStatus(id, status);

      // Update the orders array with the new order status
      set((state) => {
        const updatedOrders = state.orders.map((order) =>
          order._id === id ? updatedOrder : order
        );

        // Update the currentOrder if necessary
        const updatedCurrentOrder =
          state.currentOrder && state.currentOrder._id === id
            ? updatedOrder
            : state.currentOrder;

        return {
          orders: updatedOrders,
          currentOrder: updatedCurrentOrder,
          loading: false,
        };
      });

      return updatedOrder;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to update order status";
      set({ error: errorMessage, loading: false });
      throw new Error(errorMessage);
    }
  },
}));
