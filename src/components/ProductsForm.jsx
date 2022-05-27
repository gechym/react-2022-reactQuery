import React, { useRef } from 'react';
import { createProduct, handleError, updateProduct } from '../APi/ProductApi';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

const ProductsForm = ({ btnTxt, data }) => {
    const mutilRef = useRef();

    // const { mutate, loading, error } = useMutation();
    const create = useMutation(createProduct, {
        onSuccess: (data) => {
            toast.success('❤️❤️❤️');
        },
        onError: (error) => handleError(error),
    });
    const update = useMutation(updateProduct, {
        onSuccess: (data) => {
            toast.success('❤️❤️❤️');
        },
        onError: (error) => handleError(error),
    });

    const onHanleSupmit = (e) => {
        e.preventDefault();
        const children = mutilRef.current.children;

        let newProduct = [...children].reduce((obj, child) => {
            if (!child.value) return obj;
            return { ...obj, [child.name]: child.value };
        }, {});

        if (data) {
            newProduct = { ...newProduct, price: Number(newProduct.price) };
            if (!shallowEqual(newProduct, data)) {
                // mutate(axios.put(`/products/${data._id}`, newProduct))
                // mutate(() => updateProduct({ id: data._id, newData: newProduct }));
                update.mutate({ id: data._id, newData: newProduct });
            }
        } else {
            create.mutate(newProduct);
        }
    };

    function shallowEqual(obj1, obj2) {
        const keys = Object.keys(obj1);

        for (let key of keys) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }

        return true;
    }

    return (
        <div className="product_form">
            <form ref={mutilRef} onSubmit={onHanleSupmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Product title"
                    required
                    defaultValue={data?.title}
                />

                <input
                    type="text"
                    name="description"
                    placeholder="Product description"
                    required
                    defaultValue={data?.description}
                />

                <input
                    type="text"
                    name="price"
                    placeholder="Product price"
                    required
                    defaultValue={data?.price}
                />

                <input
                    type="text"
                    name="category"
                    placeholder="Product category"
                    required
                    defaultValue={data?.category}
                />

                <input
                    type="text"
                    name="image"
                    placeholder="Product image"
                    required
                    defaultValue={data?.image}
                />

                <button disabled={create.isLoading || update.isLoading}>
                    {create.isLoading || update.isLoading ? 'Loading..' : btnTxt}
                </button>
                <h4>{create.error || update.error}</h4>
            </form>
        </div>
    );
};

export default ProductsForm;
