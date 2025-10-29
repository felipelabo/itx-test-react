import { useParams } from "react-router";
import {useFetch} from "../hooks/useFetch";

export default function ProductDetailsPage() {

    const { id } = useParams();

    // Solicitud de datos de productos
    const { data, loading, error } = useFetch('https://itx-frontend-test.onrender.com/api/product/'+id);

    return (
        <>
            {loading && <p className="p-4">Cargando detalles del producto...</p>}
            {error && <p className="p-4" style={{color: 'red'}}>Error: {error.message}</p>}
            {data && <div className="p-4">
                {/*<h1 className="text-2xl font-bold mb-4">{data.brand} - {data.model}</h1>*/}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                    <div className="w-full flex justify-center items-center min-h-[50vh] bg-white rounded-lg shadow-md p-4 border">
                        <img src={data.imgUrl} alt={data.model} className="h-full object-cover rounded" />
                    </div>
                    <div>
                        <div className="border p-2 rounded-lg shadow-md mb-4">
                            <h3 className="text-lg font-bold">{data.brand} - {data.model}</h3>
                            <ul className="mb-4">
                                <li><strong>{data.price !== '' ? `$${data.price}` : <span className="text-red-500">No Disponible</span>}</strong></li>
                                <li>{data.cpu}</li>
                                <li>{data.ram}</li>
                                <li>{data.os}</li>
                                <li>{data.displayResolution}</li>
                                <li>Battery: {data.battery}</li>
                                <li>Primary Camera: {data.primaryCamera}</li>
                                {data.secondaryCamera && <li>Secondary Camera: {data.secondaryCamera}</li>}
                                {data.dimentions && data.dimentions != '-' && <li>Dimentions: {data.dimentions}</li>}
                                {data.weight && <li>Weight: {data.weight} g</li>}
                            </ul>

                        </div>
                        <div className="border p-2 rounded-lg shadow-md">
                            <h4 className="text-md font-bold mb-2">Actions</h4>
                            <form>
                                {data.colors && <select className="border p-2 rounded w-full mb-4" defaultValue="">
                                    <option value="" disabled>Select Color</option>
                                    {data.colors.map((color, index) => (
                                        <option key={index} value={color}>{color}</option>
                                    ))}
                                </select>}
                                {data.internalMemory && <select className="border p-2 rounded w-full mb-4" defaultValue=""> 
                                    <option value="" disabled>Select Storage</option>
                                    {data.internalMemory.map((storage, index) => (
                                        <option key={index} value={storage}>{storage}</option>
                                    ))}
                                </select>}
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors w-full">
                                    Add to Cart
                                </button>
                            </form>
                        </div>
                        
                    </div>
                    
                </div>
            </div>}
        </>
        
    );
}