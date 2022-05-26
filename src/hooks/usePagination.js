import { useMemo } from 'react';
import useCustomRoter from './useCustomRoter';

const usePagination = (totalPages, page, sort) => {
    const { pushQueryRouter } = useCustomRoter();

    const { firstArr, lastArr } = useMemo(() => {
        const newArray = [...Array(totalPages)].map((_, i) => i + 1);
        if (totalPages < 4) {
            return {
                firstArr: newArray,
                lastArr: [],
            };
        }

        if (totalPages - page >= 4) {
            return {
                firstArr: newArray.slice(page - 1, page + 2),
                lastArr: newArray.slice(totalPages - 1),
            };
        } else {
            return {
                firstArr: newArray.slice(totalPages - 4),
                lastArr: [],
            };
        }
    }, [totalPages, page]);

    const isActive = (num) => {
        if (num === page) return 'active';
        else return '';
    };

    const jump = (num) => {
        pushQueryRouter({
            page: num,
            sort: sort,
        });
    };

    const prev = () => {
        const newPage = Math.max(page - 1, 1);
        pushQueryRouter({
            page: newPage,
            sort: sort,
        });
    };

    const next = () => {
        const newPage = Math.min(page + 1, totalPages);
        pushQueryRouter({
            page: newPage,
            sort: sort,
        });
    };

    return { firstArr, isActive, lastArr, next, prev, jump };
};

export default usePagination;
