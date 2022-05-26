import Home from './pages/Home';
import Product from './pages/Product';
import { Route, Routes } from 'react-router-dom';
import ProductDetail from './pages/ProductDetail';
import Header from './components/Header';
import Search from './pages/Search';
import Filter from './pages/Filter';

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Home name="Bảo" age={18}>
                            {/* {() => {
                console.log("I am childer function props")
              }} */}
                            <h1>Hello</h1>
                        </Home>
                    }
                />
                <Route path="/product" element={<Product />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/search/:search" element={<Search />} />
                <Route path="/filter/:value/:select" element={<Filter />} />
            </Routes>
        </div>
    );
}

export default App;
