import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const FilterForm = () => {
    const refInput = useRef();
    const refSelect = useRef();
    const navigate = useNavigate();

    const handleSupmit = (e) => {
        e.preventDefault();
        const value = refInput.current.value;
        const select = refSelect.current.value;

        if (!value.trim()) return;

        console.log(value, select);
        navigate(`/filter/${value}/${select}`);
    };

    return (
        <div className="filter_form" title="Enter to filter">
            <form onSubmit={handleSupmit}>
                <div>
                    <input type="text" placeholder="0" required ref={refInput} />

                    <select ref={refSelect}>
                        <option value="lt" title="lesser than">
                            LT
                        </option>
                        <option value="lte" title="lesser than or equal">
                            LTE
                        </option>
                        <option value="gt" title="greater than">
                            GT
                        </option>
                        <option value="gte" title="greater than or equal">
                            GTE
                        </option>
                    </select>
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
};

export default FilterForm;
