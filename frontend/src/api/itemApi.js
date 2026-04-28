import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

console.log("API Base URL:", API_BASE_URL);

const API = axios.create({
  baseURL: API_BASE_URL,
});

export const getItems = () => API.get("/items");
export const getItemById = (id) => API.get(`/items/${id}`);
export const createItem = (itemData) => API.post("/items", itemData);
export const updateItem = (id, itemData) => API.put(`/items/${id}`, itemData);
export const deleteItem = (id) => API.delete(`/items/${id}`);

export default API;