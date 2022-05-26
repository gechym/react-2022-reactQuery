import axios from 'axios';

export const createProduct = async (newData) => {
    return axios.post('/products', newData);
};

export const updateProduct = async ({ id, newData }) => {
    return axios.put(`/products/${id}`, newData);
};

export const deleteProduct = async (id) => {
    return axios.delete(`/products/${id}`);
};

// Mutation react-query
export const getData = async ({ queryKey }) => {
    const res = await axios.get(queryKey[0]);
    console.log(res);
    return res.data;
};
