import { create } from 'zustand';
import { getMenuItems, addMenuItem, updateMenuItem, deleteMenuItem } from '../api/menu';

export const useMenuStore = create((set) => ({
  items: [],
  loading: false,
  error: null,

  fetchMenuItems: async (category, type) => {
    set({ loading: true, error: null });
    try {
      const items = await getMenuItems(category, type);
      set({ items, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to fetch menu items', loading: false });
      throw error;
    }
  },

  addMenuItem: async (formData) => {
    set({ loading: true, error: null });
    try {
      const item = await addMenuItem(formData);
      set(state => ({ items: [...state.items, item], loading: false }));
      return item;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to add menu item', loading: false });
      throw error;
    }
  },

  updateMenuItem: async (id, formData) => {
    set({ loading: true, error: null });
    try {
      const updatedItem = await updateMenuItem(id, formData);
      set(state => ({
        items: state.items.map(item => item._id === id ? updatedItem : item),
        loading: false
      }));
      return updatedItem;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to update menu item', loading: false });
      throw error;
    }
  },

  deleteMenuItem: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteMenuItem(id);
      set(state => ({
        items: state.items.filter(item => item._id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error.response?.data?.message || 'Failed to delete menu item', loading: false });
      throw error;
    }
  },
}));