import React, { memo, useRef } from 'react';
import useCustomRoter from '../hooks/useCustomRoter';

import { MyStoreContexNavigate } from '../context/Store';

const Sorting = ({ page }) => {
    const { sort } = MyStoreContexNavigate();

    const { pushQueryRouter } = useCustomRoter();
    let ref = useRef(0);

    const handleSort = (e) => {
        const { value } = e.target;
        pushQueryRouter({ page, sort: value });
    };

    return (
        <div className="sorting">
            <h1>{ref.current++}</h1>
            <select onChange={handleSort} value={sort}>
                <option value="-createdAt">Newest</option>
                <option value="createdAt">Oldest</option>
                <option value="-price">Price: Hight-Low</option>
                <option value="price">Price: Low-Hight</option>
            </select>
            <h2>&#8678;Sort</h2>
        </div>
    );
};

export default memo(Sorting);
