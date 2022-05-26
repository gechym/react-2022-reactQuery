import React, { useRef, memo } from 'react';
import usePagination from '../hooks/usePagination';

import { MyStoreContexNavigate } from '../context/Store';

const Pagination = ({ totalPages }) => {
    let { page, sort } = MyStoreContexNavigate();

    let { firstArr, isActive, lastArr, next, prev, jump } = usePagination(totalPages, page, sort);
    let ref = useRef(0);

    console.log(firstArr, lastArr);

    return (
        <div className="pagination">
            <h1>{ref.current++}</h1>
            <button onClick={prev}>&laquo;</button>
            {firstArr.map((num) => (
                <button onClick={() => jump(num)} className={isActive(num)} key={num}>
                    {num}
                </button>
            ))}
            {lastArr.length > 0 && <button>...</button>}
            {lastArr.map((num) => (
                <button onClick={() => jump(num)} className={isActive(num)} key={num}>
                    {num}
                </button>
            ))}
            <button onClick={next}>&raquo;</button>
        </div>
    );
};

export default memo(Pagination);
