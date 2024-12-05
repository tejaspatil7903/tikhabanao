import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${backendUrl}/api/auth`;

export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const registerAdmin = async (adminData) => {
  const response = await axios.post(`${API_URL}/register-admin`, adminData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export const registerDeliveryPerson = async (deliveryData) => {
  const response = await axios.post(`${API_URL}/register-delivery`, deliveryData);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('user');
};