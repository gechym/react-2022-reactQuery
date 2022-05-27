import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import ProductInfo from '../components/ProductInfo';
import { useQuery, useQueryClient } from 'react-query';
import { getData } from '../APi/ProductApi';

const ProductDetail = () => {
    const { id } = useParams();
    const key = `/products/${id}`;

    // lấy data Tạm từ trang product
    const dataFromPageProduct = useQueryClient();
    const dataPlaceHolder = dataFromPageProduct.getQueriesData('dataFromPageProduct');

    let {
        data: product,
        isLoading,
        error,
    } = useQuery(key, getData, {
        placeholderData: () => {
            if (dataPlaceHolder[0]) {
                const data = dataPlaceHolder[0][1]?.products;
                return data.find((product) => product._id === id);
            }
        },
    });

    return (
        <div>
            {product && <ProductInfo product={product} />}
            {isLoading && <h2>Loading......</h2>}
            {error && <h2>{error.message}</h2>}
        </div>
    );
};

export default ProductDetail;
