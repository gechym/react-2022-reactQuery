import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../components/Products';
import Sorting from '../components/Sorting';
import { MyStoreContexNavigate } from '../context/Store';
import useInfinityQuery from '../hooks/useInfinityQuery';

const Filter = () => {
    const { value, select: option } = useParams();
    const [products, setProducts] = useState([]);
    const [limit] = useState(2);
    const [stop, setStop] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);
    const { sort } = MyStoreContexNavigate();

    const { data, loading, error, renderBtnLoadMore } = useInfinityQuery({
        url: `/products?price[${option}]=${value}&limit=${limit}&sort=${sort}`,
        depens: [value, option, sort],
        otp: { stop, firstLoad },
    });

    useEffect(() => {
        setStop(false);
        setFirstLoad(false);
        setProducts([]);
    }, [value, option, sort]);

    useEffect(() => {
        if (data?.products) {
            setProducts((prev) => [...prev, ...data?.products]);
            setFirstLoad(true);

            if (data.products.length < limit) {
                setStop(true);
            }
        }
    }, [data?.products, limit]);

    return (
        <div>
            <Sorting />
            <Products products={products} />
            {loading && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}
            {renderBtnLoadMore()}
        </div>
    );
};

export default Filter;
