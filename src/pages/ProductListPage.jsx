import { useState, useEffect} from 'react';
import { useFetch } from '../hooks/useFetch';
import ProductCardList from '../components/ProductCardList';
import SkeletonCard from '../components/SkeletonCard';
import SearchBar from '../components/SearchBar';

/**
 * Componente de la página de lista de productos.
 * 
 * Muestra una lista de productos.
 * @returns {JSX.Element} Componente ProductListPage
 */

export default function ProductListPage() {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const { data, loading, error } = useFetch(import.meta.env.VITE_API_LIST_URL);

    useEffect(() => {
        if (data) setFilteredProducts(data);
    }, [data]);

    // Renderiza 8 SkeletonCard simulando la carga
    const skeletonCards = Array.from({ length: 8 }, (_, i) => (
        <SkeletonCard key={i} />
    ));

    return (
        <main>
            <div className="p-4">
                <div className='p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center'>
                    <div className='title-box mb-4 sm:mb-0'>
                        <h2 className='text-2xl text-(--primary-color) font-bold'>Smarthphones & Tables</h2>
                        <h4 className='text-xs text-(--secondary-color)'>Electronics & Technology</h4>
                    </div>
                    <SearchBar listToChange={data} setListToChange={setFilteredProducts} />
                </div>
                {error && 
                    <div className='p-4'>
                        <div id="product_details" className="bg-white w-full rounded-lg p-4">
                            <p className='text-base text-(--primary-color) text-center'>Product list are not available.</p>
                        </div>
                    </div>
                }
                {loading && (
                    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
                        {skeletonCards}
                    </ul>
                )}
                {filteredProducts.length > 0 && (
                    <ProductCardList products={filteredProducts} />
                )}
                
            </div>
        </main>
    );
}