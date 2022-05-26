import React, { memo } from 'react';
import ProductCard from './ProductCard';

const Products = ({ products }) => {
    return (
        <div className="products">
            {products.map((product) => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default memo(Products);
