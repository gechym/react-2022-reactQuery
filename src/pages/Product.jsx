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

    const key = `/products?limit=${limit}&page=${page}&sort=${sort}`;

    // Hổ trợ cache data
    const { data, isLoading, isFetching, error, refetch, isPreviousData } = useQuery({
        queryKey: key,
        queryFn: getData,
        enabled: !!limit && !!page && !!sort, // Chặn tự đông gọi api khi cái cấu hình null hoặc undefined
        keepPreviousData: true,
        // Giữa lại data khi fetch lại data tránh để data null tăng UX kết Hợp vs isFetching để hiển hị loading
        staleTime: 60 * 1000, // thời gian lưa data lại ko cần chạy ngầm dể load mới data
        cacheTime: 60 * 1000 * 10, // Thời gia bị kill
    });

    // useEffect(() => {
    //     refetch(); // gọi lại useQuery khi refetching ở contex cha thay đổi
    // }, [refetching, refetch]);

    const totalPage = useMemo(() => {
        if (data?.count) return Math.ceil(data.count / limit);
        else return 0;
    }, [data?.count, limit]);

    return (
        <div>
            <h1>{ref.current++}</h1>
            <Sorting page={page} />
            {data && <Products products={data.products} />}
            {isPreviousData && isFetching && <h2>Loading...</h2> /*thay thế loading*/}
            {error && <h2>{error.message}</h2>}
            <Pagination totalPages={totalPage} />
        </div>
    );
};

export default Product;
