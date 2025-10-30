import { useState, useEffect } from 'react';
import {useFetch} from '../hooks/useFetch';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

export default function ProductListPage() {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const { data, loading, error } = useFetch('https://itx-frontend-test.onrender.com/api/product');

    useEffect(() => {
        if (data) setFilteredProducts(data);
    }, [data]);

    return (
        <main>
            <div className="p-4">
                    <div className='p-4 flex justify-between items-center'>
                        <div className='title-box'>
                            <h2 className='text-2xl text-(--primary-color) font-bold'>Smarthphones & Tables</h2>
                            <h4 className='text-xs text-(--secondary-color)'>Electronics & Technology</h4>
                        </div>
                        
                        <SearchBar listToChange={data} setListToChange={setFilteredProducts} />
                    </div>
                {loading && <p>Cargando productos...</p>}
                {error && <p style={{color: 'red'}}>Error: {error.message}</p>}
                {filteredProducts.length > 0 && (
                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
                    {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                </ul>
                )}
            </div>
        </main>
    );
}