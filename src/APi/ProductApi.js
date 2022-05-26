import axios from "axios";

export const createProduct = async (newData) => {
  return axios.post('/products', newData)
};

export const updateProduct = async ({id, newData}) => {
  return axios.put(`/products/${id}`, newData)
};

export const deleteProduct = async (id) => {
  return axios.delete(`/products/${id}`)
};