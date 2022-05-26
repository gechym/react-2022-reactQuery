import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useQuery } from 'react-query';

import Pagination from '../components/Pagination';
import Products from '../components/Products';
import Sorting from '../components/Sorting';
import { MyStoreContexNavigate } from '../context/Store';
import { getData } from '../APi/ProductApi';

const Product = () => {
    let [limit] = useState(5);

    let ref = useRef(0);

    let { page, sort, refetching } = MyStoreContexNavigate(); // 1 aa

    // let { data, loading, error } = useQuery(
    //     `/products?limit=${limit}&page=${page}&sort=${sort}`,
    //     {
    //         saveCache: true,
    //         refetching,
    //     },
    // ); // []

    const key = `/products?limit=${limit}&page=${page}&sort=${sort}`;
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: key,
        queryFn: getData,
        enabled: !!limit && !!page && !!sort, // Chặn tự đông gọi api khi cái cấu hình null hoặc undefined
    });

    useEffect(() => {
        refetch(); // gọi lại useQuery khi refetching ở contex cha thay đổi
    }, [refetching]);

    const totalPage = useMemo(() => {
        if (data?.count) return Math.ceil(data.count / limit);
        else return 0;
    }, [data?.count, limit]);

    return (
        <div>
            <h1>{ref.current++}</h1>
            <Sorting page={page} />
            {data && <Products products={data.products} />}
            {isLoading && <h2>Loading...</h2>}
            {error && <h2>{error.message}</h2>}
            <Pagination totalPages={totalPage} />
        </div>
    );
};

export default Product;
