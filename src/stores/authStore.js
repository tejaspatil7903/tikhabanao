import { create } from 'zustand';
import {
  login,
  logout,
  register,
  registerAdmin,
  registerDeliveryPerson
} from '../api/auth';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  loading: false,
  error: null,

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const user = await register(userData);
      set({ user, loading: false });
      return user;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Registration failed', loading: false });
      throw error;
    }
  },

  registerAdmin: async (adminData) => {
    set({ loading: true, error: null });
    try {
      const user = await registerAdmin(adminData);
      set({ user, loading: false });
      return user;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Admin registration failed', loading: false });
      throw error;
    }
  },

  registerDeliveryPerson: async (deliveryData) => {
    set({ loading: true, error: null });
    try {
      const result = await registerDeliveryPerson(deliveryData);
      set({ loading: false });
      return result;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Delivery person registration failed', loading: false });
      throw error;
    }
  },

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const user = await login(credentials);
      set({ user, loading: false });
      return user;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Login failed', loading: false });
      throw error;
    }
  },

  logout: () => {
    logout();
    set({ user: null });
  },
}));