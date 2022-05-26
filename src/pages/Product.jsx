import React, { useEffect, useMemo, useState, useRef } from 'react';
import Pagination from '../components/Pagination';
import Products from '../components/Products';
import Sorting from '../components/Sorting';
import useQuery from '../hooks/useQuery';
import { MyStoreContexNavigate } from '../context/Store';

const Product = () => {
    let [products, setProducts] = useState([]);
    let [limit] = useState(100);

    let ref = useRef(0);

    let { page, sort, refetching } = MyStoreContexNavigate(); // 1 aa

    let { data, loading, error } = useQuery(
        `/products?limit=${limit}&page=${page}&sort=${sort}`,
        {
            saveCache: true,
            refetching,
        },
    ); // []

    const totalPage = useMemo(() => {
        if (data?.count) return Math.ceil(data.count / limit);
        else return 0;
    }, [data?.count, limit]);

    useEffect(() => {
        if (data?.products) setProducts(data?.products);
    }, [data?.products]);

    return (
        <div>
            <h1>{ref.current++}</h1>
            <Sorting page={page} />
            <Products products={products} />
            {loading && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}
            <Pagination totalPages={totalPage} />
        </div>
    );
};

export default Product;
