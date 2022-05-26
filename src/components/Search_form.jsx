import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Search_form = () => {
    let inputRef = useRef();
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let value = inputRef.current.value;
        if (!value.trim()) return;
        navigate(`/search/${value}`);
    };

    return (
        <div className="search_form">
            <form onSubmit={handleSubmit}>
                <input type="text" ref={inputRef} />
                <button>Search</button>
            </form>
        </div>
    );
};

export default Search_form;
