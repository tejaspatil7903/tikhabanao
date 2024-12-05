// order.js (API file)
import axios from "axios";
import { getAuthHeader } from "../utils/auth";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${backendUrl}/api/orders`;

export const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const getOrders = async () => {
  const response = await axios.get(API_URL, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: getAuthHeader(),
  });
  return response.data;
};

export const updateOrderStatus = async (id, status) => {
  console.log(id);
  const response = await axios.put(
    `${API_URL}/${id}/status`, // Updated URL with '/status'
    { status },
    { headers: getAuthHeader() }
  );
  return response.data;
};
