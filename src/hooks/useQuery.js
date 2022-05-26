import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { MyStoreContexNavigate } from '../context/Store';

const DEFAULT_OPTION = {
    sizeCache: 100,
    saveCache: false,
    refetchInterval: 1000,
};

const useQuery = (url, opt) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();

    const option = { ...DEFAULT_OPTION, ...opt };
    const { cache } = MyStoreContexNavigate();

    const clearCache = useCallback(() => {
        if (Object.keys(cache.current).length >= option.sizeCache)
            return (cache.current = {});
    }, [cache, option.sizeCache]);

    useEffect(() => {
        let here = true;
        if (cache.current[url]) {
            setData(cache.current[url]);
        }

        const delayDebounce = setTimeout(
            () => {
                if (!cache.current[url]) setLoading(true);

                axios
                    .get(url)
                    .then((res) => {
                        if (!here) return;
                        setLoading(false);
                        toast.success('thang cong');
                        setData(res.data);
                        if (option.saveCache) {
                            // lưu vô cache
                            cache.current[url] = res.data;
                        }
                    })
                    .catch((err) => {
                        if (!here) return;
                        setLoading(false);
                        toast.error(`Lỗi ${err}`);
                        setError(`${err}`);
                    })
                    .finally(() => {
                        setLoading(false);
                    });
            },
            cache.current[url] ? option.refetchInterval : 0,
        );

        clearCache();

        return () => {
            here = false;
            clearTimeout(delayDebounce);
        };
    }, [url, cache, clearCache, option.refetchInterval, option.refetching]);

    return { data, loading, error };
};

export default useQuery;
