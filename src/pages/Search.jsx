import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../components/Products';
import Sorting from '../components/Sorting';
import { MyStoreContexNavigate } from '../context/Store';
import useInfinityQuery from '../hooks/useInfinityQuery';

const Search = () => {
    const [products, setProducts] = useState([]);
    const { search } = useParams();
    const { sort } = MyStoreContexNavigate();

    const [limit] = useState(2);
    const [stop, setStop] = useState(false);
    const [firstLoad, setFirstLoad] = useState(false);

    const { data, loading, error, renderBtnLoadMore } = useInfinityQuery({
        url: `/products?search=${search}&sort=${sort}&limit=${limit}`,
        depens: [search, sort],
        otp: { stop, firstLoad },
    });

    useEffect(() => {
        setStop(false);
        setFirstLoad(false);
        setProducts([]);
    }, [search, sort]);

    useEffect(() => {
        if (data?.products) {
            setStop(false);
            setFirstLoad(true);
            setProducts((prev) => [...prev, ...data.products]);
            if (data.products.length < limit) setStop(true);
        } else {
            setStop(true);
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

export default Search;
