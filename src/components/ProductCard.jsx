import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from './Modal';
import ProductsForm from './ProductsForm';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProduct, handleError } from '../APi/ProductApi';
// import ImageLazyLoading from './ImageLazyLoading';
import useLazyLoading from '../hooks/useLazyLoading';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
    const [openProduct, setOpenProduct] = useState(false);
    const queryClient = useQueryClient();
    const deleteAt = useMutation(deleteProduct, {
        onSuccess: (data) => {
            toast.success('❤️❤️❤️' + { data });
        },
        onError: (error) => handleError(error),
        onSettled: () => {
            queryClient.invalidateQueries();
        },
    });
    const { ref } = useLazyLoading();

    const handleDelete = (id) => {
        // if (window.confirm('Bạn có chắt muốn xóa')) {
        deleteAt.mutate(id);
        // }
    };

    return (
        <div className="card">
            {/* <ImageLazyLoading url={product.image} /> */}
            <img className="lazy-load" ref={ref} alt={product.image} />

            <div className="box">
                <h3>
                    <Link to={`/products/${product._id}`}>
                        <span />
                        {product.title}
                    </Link>
                </h3>
                <h4>${product.price}</h4>

                <div className="btn_div">
                    <button className="btn_edit" onClick={() => setOpenProduct(true)}>
                        Edit
                    </button>
                    <button
                        className="btn_delete"
                        onClick={() => handleDelete(product._id)}
                    >
                        Delete
                    </button>
                </div>
            </div>

            {openProduct && (
                <Modal setOpen={setOpenProduct} titleTxt={'UPDATE PRODUCT'}>
                    <ProductsForm btnTxt={'Update'} data={product} />
                </Modal>
            )}
        </div>
    );
};

export default ProductCard;
