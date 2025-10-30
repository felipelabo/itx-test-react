import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {useFetch} from "../hooks/useFetch";

export default function ProductDetailsPage() {

    const { id } = useParams();
    const { data, loading, error } = useFetch('https://itx-frontend-test.onrender.com/api/product/'+id);

    const [color, setColor] = useState('');
    const [storage, setStorage] = useState('');

    /* Manejo el cambio de color */
    const handleColorChange = (e) => {
        console.log(e.target.value);
        setColor(e.target.value);
    };
    
    /* Manejo el cambio de Almacenamiento */
    const handleStorageChange = (e) => {
        console.log(e.target.value);
        setStorage(e.target.value);
    };

    useEffect(() => {
        if (!data) return;
        if (data.options.colors && data.options.colors?.length == 1) setColor(data.options.colors[0].code);
        if (data.options.storages && data.options.storages?.length == 1) setStorage(data.options.storages[0].code);
    }, [data]);

    return (
        <>
            {loading && <p className="p-4">Cargando detalles del producto...</p>}
            {error && <p className="p-4" style={{color: 'red'}}>Error: {error.message}</p>}
            {data && <div className="p-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                    <div className="w-full flex justify-center items-center h-[50vh] rounded-lg p-4">
                        <img src={data.imgUrl} alt={data.model} className="h-full object-cover rounded" />
                    </div>
                    <div>
                        <div className="p-2 rounded-lg mb-4 ">

                            {/* Titulo de producto */}
                            <div className="grid grid-cols-4 gap-4 mb-15">
                                <div className="col-span-3 flex flex-col justify-center items-start">
                                    <h3 className="text-xl font-bold text-(--primary-color)">{data.model}</h3>
                                    <h4 className="text-md font-semibold text-(--secondary-color)">{data.brand}</h4>
                                </div>
                                <div className="col-span-1 flex justify-end items-start">
                                    {data.price !== '' && <p className="text-xl font-bold text-(--secondary-color)">€{data.price}.00</p>}
                                    {data.price === '' && <p className="text-xl font-bold text-red-500">Not available</p>}
                                </div>
                            </div>

                            {/* Formulario de selección de color y almacenamiento */}
                            <div className="rounded-lg mb-15">
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <p className="mb-1">Color</p>
                                    {data.options.colors && (
                                        <div className="flex gap-4 mb-4">
                                            {data.options.colors.map((colorOption, index) => (
                                                <label key={index} className="cursor-pointer px-4 py-2 rounded border border-solid border-gray-200 hover:border-(--secondary-color-dark) has-checked:border-(--secondary-color) transition-colors flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="color"
                                                        value={colorOption.code}
                                                        className="hidden"
                                                        checked={colorOption.code == color}
                                                        onChange={handleColorChange}
                                                    />
                                                    <span className="block text-sm font-medium">{colorOption.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                    <p className="mb-1">Storage</p>
                                    {data.options.storages && (
                                        <div className="flex gap-4 mb-4">
                                            {data.options.storages.map((storageOption, index) => (
                                                <label key={index} className="cursor-pointer px-4 py-2 rounded border border-gray-200 hover:border-(--secondary-color-dark) has-checked:border-(--secondary-color) transition-colors flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="storage"
                                                        value={storageOption.code}
                                                        className="hidden"
                                                        checked={storageOption.code == storage}
                                                        onChange={handleStorageChange}
                                                    />
                                                    <span className="block text-sm font-medium">{storageOption.name}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                    <button 
                                        type="submit" 
                                        className="bg-(--primary-color) text-white px-4 py-2 rounded hover:bg-(--primary-color-dark) disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors w-full mt-4"
                                        disabled={data.price == ''}    
                                    >
                                        
                                        Add to Cart
                                    </button>
                                </form>
                            </div>
                            
                            {/* Especificaciones técnicas */}
                            <div className="text-sm">
                                <h4 className="mb-4">Description</h4>
                                <h4 className="mb-2">Reference: {data.id}</h4>
                                <ul className="mb-4">
                                    {data.cpu && <li className="mb-1">CPU: {data.cpu}</li>}
                                    {data.ram && <li className="mb-1">RAM: {data.ram}</li>}
                                    {data.os && <li className="mb-1">OS: {data.os}</li>}
                                    {data.displayResolution && <li className="mb-1">Display Resolution: {data.displayResolution}</li>}
                                    {data.battery && <li className="mb-1">Battery: {data.battery}</li>}
                                    {data.primaryCamera && <li className="mb-1">Primary Camera: {data.primaryCamera}</li>}
                                    {data.secondaryCamera && <li className="mb-1">Secondary Camera: {data.secondaryCamera}</li>}
                                    {data.dimentions && data.dimentions != '-' && <li className="mb-1">Dimentions: {data.dimentions}</li>}
                                    {data.weight && <li className="mb-1">Weight: {data.weight} g</li>}
                                </ul>
                            </div>
                            

                        </div>
                        
                        
                    </div>
                    
                </div>
            </div>}
        </>
        
    );
}