import React, { useState, useContext } from 'react';

import { Store } from '../context/Store';

const Home = ({ name = 'Default Name', age = -1, children }) => {
    let [product, setProducts] = useState(1);
    const context = useContext(Store);

    return (
        <div>
            <h1
                style={{ cursor: 'pointer' }}
                // onClick={children}
            >
                Name : {name} || {context.page}
            </h1>
            <h2>Age : {age}</h2>
            <h3>Product : {product}</h3>
            <button
                onClick={() => {
                    setProducts((prev) => ++prev);
                }}
            >
                Click
            </button>
            {children}
        </div>
    );
};

export default Home;
