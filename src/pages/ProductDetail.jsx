import React from 'react';
import { useParams } from 'react-router-dom';
import ProductInfo from '../components/ProductInfo';
import useQuery from '../hooks/useQuery';

const ProductDetail = () => {
    const { id } = useParams();
    let { data: product, loading, error } = useQuery(`/products/${id}`, { saveCache: true });

    return (
        <div>
            {product && <ProductInfo product={product} />}
            {loading && <h2>Loading......</h2>}
            {error && <h2>{error}</h2>}
        </div>
    );
};

export default ProductDetail;
