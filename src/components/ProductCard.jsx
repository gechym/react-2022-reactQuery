import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Modal from './Modal';
import ProductsForm from './ProductsForm';
import useMutation from '../hooks/useMutation';
import { deleteProduct } from '../APi/ProductApi';
// import ImageLazyLoading from './ImageLazyLoading';
import useLazyLoading from '../hooks/useLazyLoading';

const ProductCard = ({ product }) => {
    const [openProduct, setOpenProduct] = useState(false);
    const { mutate } = useMutation();
    const { ref } = useLazyLoading();

    const handleDelete = (id) => {
        if (window.confirm('Bạn có chắt muốn xóa')) {
            mutate(() => deleteProduct(id));
        }
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
