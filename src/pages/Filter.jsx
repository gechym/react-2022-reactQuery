import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Products from '../components/Products';
import Sorting from '../components/Sorting';
import { MyStoreContexNavigate } from '../context/Store';
import { useInfiniteQuery } from 'react-query';
import { getDataInfinityQuery } from '../APi/ProductApi';
import useInview from '../hooks/useInView';

const Filter = () => {
    const { value, select: option } = useParams();
    const [limit] = useState(2);
    const { sort } = MyStoreContexNavigate();
    const { inView, ref } = useInview();

    const key = `/products?price[${option}]=${value}&limit=${limit}&sort=${sort}`;
    const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
        useInfiniteQuery(key, getDataInfinityQuery, {
            getNextPageParam: (lastPage, pages) => {
                const { products } = lastPage;
                if (products.length >= limit) {
                    return pages.length + 1;
                } else {
                    return undefined;
                }
            },
        });

    useEffect(() => {
        if (inView && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, isFetchingNextPage, fetchNextPage]);

    return (
        <div>
            <Sorting />
            <div>
                {data?.pages.map((page, index) => {
                    return <Products key={index} products={page.products} />;
                })}
            </div>

            {isFetching && <h2>Loading...</h2>}
            {error && <h2>{error}</h2>}
            {/* {renderBtnLoadMore()} */}
            {
                <button
                    disabled={!hasNextPage || isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    ref={ref}
                    className="btn-load_more"
                >
                    Load more
                </button>
            }
        </div>
    );
};

export default Filter;
