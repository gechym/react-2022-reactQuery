import axios from 'axios';
import { Slide, toast } from 'react-toastify';

const handleError = (error) => {
    if (error.response?.data.msg) {
        toast.error(error.response.data.msg);
        throw new Error(error.response.data.msg);
    } else {
        toast.error(error.message);
        throw new Error(error.message);
    }
};

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
    try {
        const id = toast.loading('Please wait...🤯');
        toast.update(id, {
            render: 'Please wait...🤯',
            type: 'success',
            isLoading: true,
            transition: Slide,
        });

        const res = await axios.get(queryKey[0]);

        toast.update(id, {
            render: 'All is good 👌',
            type: 'success',
            isLoading: false,
            closeOnClick: true,
            autoClose: 5000,
            transition: Slide,
            hideProgressBar={true}
        });

        return res.data;
    } catch (error) {
        handleError(error);
    }
};
