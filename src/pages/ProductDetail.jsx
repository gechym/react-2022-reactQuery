import React from 'react';
import { useParams } from 'react-router-dom';
import ProductInfo from '../components/ProductInfo';
import { useQuery } from 'react-query';
import { getData } from '../APi/ProductApi';

const ProductDetail = () => {
    const { id } = useParams();
    const key = `/products/${id}`;
    let { data: product, isLoading, error } = useQuery(key, getData);

    return (
        <div>
            {product && <ProductInfo product={product} />}
            {isLoading && <h2>Loading......</h2>}
            {error && <h2>{error.message}</h2>}
        </div>
    );
};

export default ProductDetail;
