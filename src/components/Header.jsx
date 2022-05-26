import React, { useState } from 'react';
import Modal from './Modal';
import SearchForm from './Search_form';
import FilterForm from './FilterForm';
import ProductsForm from './ProductsForm';
import { Link } from 'react-router-dom';

const Header = () => {
    let [openSearch, setOpenSearch] = useState(false);
    let [openFilter, setOpenFilter] = useState(false);
    let [productsForm, setProductsForm] = useState(false);

    return (
        <header>
            <nav>
                <Link to={`/product`}>
                    <p>Home</p>
                </Link>
                <p onClick={() => setProductsForm(true)}>Create Product</p>
                <p onClick={() => setOpenSearch(true)}>Search</p>
                <p onClick={() => setOpenFilter(true)}>Filter</p>
            </nav>

            {openSearch && (
                <Modal titleTxt="Search" setOpen={setOpenSearch}>
                    <SearchForm />
                </Modal>
            )}

            {openFilter && (
                <Modal titleTxt="Filter" setOpen={setOpenFilter}>
                    <FilterForm />
                </Modal>
            )}

            {productsForm && (
                <Modal titleTxt="CREATE PRODUCT" setOpen={setProductsForm}>
                    <ProductsForm btnTxt={'Supmit'} />
                </Modal>
            )}
        </header>
    );
};

export default Header;
