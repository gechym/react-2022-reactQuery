import React, { useEffect, useState, useRef, useCallback } from 'react';

import useQuery from './useQuery';

const DEFAULT_OPTION = {
    stop: false,
    firstLoad: false,
};

function useInfinityQuery({ url, depens = [], otp }) {
    const [page, setPage] = useState(1);
    const { data, loading, error } = useQuery(`${url}&page=${page}`);
    const btnRef = useRef();

    const option = { ...DEFAULT_OPTION, ...otp };

    useEffect(() => {
        setPage(1);
    }, depens);

    const handleLoadMore = useCallback(() => {
        if (option.stop) return;
        setPage((prev) => prev + 1);
    }, [option.stop]);

    useEffect(() => {
        const btn = btnRef.current;

        const observer = new IntersectionObserver((entrins) => {
            if (entrins[0].isIntersecting && option.firstLoad) {
                handleLoadMore();
            }
        });

        if (btn) {
            observer.observe(btn);
        }

        return () => {
            if (btn) observer.unobserve(btn);
        };
    }, [option.firstLoad, handleLoadMore]);

    const renderBtnLoadMore = () => {
        return (
            <button
                ref={btnRef}
                className="btn-load_more"
                onClick={handleLoadMore}
                disabled={option.stop}
            >
                Load more
            </button>
        );
    };

    return { data, loading, error, renderBtnLoadMore };
}

export default useInfinityQuery;
