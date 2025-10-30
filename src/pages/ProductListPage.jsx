import {useFetch} from '../hooks/useFetch';
import ProductCard from '../components/ProductCard';

export default function ProductListPage() {

    // Solicitud de datos de productos
    const { data, loading, error } = useFetch('https://itx-frontend-test.onrender.com/api/product');

    return (
        <main>
            <div className="p-4">
                    <div className='p-4 flex justify-end items-center'>
                        <div className="relative w-[30%]">
                            <input
                                type="text"
                                placeholder="Filter products..."
                                className="shadow-(--boxshadow) w-full bg-(--primary-color-on) border-(--primary-color) border-solid border p-2 pr-10 rounded-lg focus:outline-none focus:ring-1 focus:ring-(--primary-color)"
                            />
                            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                            </span>
                        </div>
                    </div>
                {loading && <p>Cargando productos...</p>}
                {error && <p style={{color: 'red'}}>Error: {error.message}</p>}
                {data && Array.isArray(data) && (
                <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
                    {data.map((product) => <ProductCard key={product.id} product={product} />)}
                </ul>
                )}
            </div>
        </main>
    );
}