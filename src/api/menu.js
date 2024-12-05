import axios from 'axios';
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const API_URL = `${backendUrl}/api/menu`;

export const getMenuItems = async (category, type) => {
  const params = new URLSearchParams();
  if (category) params.append('category', category);
  if (type) params.append('type', type);
  
  const response = await axios.get(`${API_URL}?${params.toString()}`);
  return response.data;
};

export const addMenuItem = async (formData) => {
  const response = await axios.post(API_URL, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // <-- Added Authorization Header
    },
  });
  return response.data;
};

export const updateMenuItem = async (id, formData) => {
  const response = await axios.put(`${API_URL}/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // <-- Added Authorization Header
    },
  });
  return response.data;
};

export const deleteMenuItem = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};