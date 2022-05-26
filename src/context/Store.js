import React, { useContext, useState, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const Store = React.createContext('Hello context');

export const MyStoreContexNavigate = () => useContext(Store);

export const ContextProvider = ({ children }) => {
    let { search } = useLocation();
    let cache = useRef({});
    const [refetching, setRefetching] = useState(false);

    const { page, sort } = useMemo(() => {
        const page = new URLSearchParams(search).get('page') || 1;
        const sort = new URLSearchParams(search).get('sort') || '-createdAt';

        return {
            page: Number(page),
            sort: sort,
        };
    }, [search]);

    Store.displayName = 'Cung cấp Page vs Sort';

    return (
        <Store.Provider value={{ page, sort, cache, refetching, setRefetching }}>
            {children}
        </Store.Provider>
    );
};
