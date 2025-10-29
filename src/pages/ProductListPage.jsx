import {useFetch} from '../hooks/useFetch';
import ProductCard from '../components/ProductCard';

export default function ProductListPage() {

    // Solicitud de datos de productos
    const { data, loading, error } = useFetch('https://itx-frontend-test.onrender.com/api/product');

    return (
        <main>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Product List</h1>
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