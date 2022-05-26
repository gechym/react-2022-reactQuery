import React from 'react';

function ProductInfo({ product }) {
    return (
        <div className="product_info">
            <img src={product.image} alt={product.image} />
            <div className="box">
                <h2>{product.title}</h2>
                <h3>${product.price}</h3>
                <p>{product.description}</p>
                <h4>Category: {product.category}</h4>
                <button>Add to cart</button>
            </div>
        </div>
    );
}

export default ProductInfo;
