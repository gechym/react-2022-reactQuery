import { useNavigate, useLocation } from 'react-router-dom';

const useCustomRoter = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const pushQueryRouter = ({ page, sort }) => {
        const query = {};

        if (page) query.page = page;
        if (sort) query.sort = sort;

        const params = query;
        const newQuery = new URLSearchParams(params).toString();
        navigate(`${pathname}?${newQuery}`);
    };

    return { pushQueryRouter };
};

export default useCustomRoter;
