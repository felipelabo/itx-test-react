import { useState, useEffect } from "react";
import { useParams } from "react-router";
import {useFetch} from "../hooks/useFetch";
import RadioButton from "../components/RadioButton";
import { useCart } from "../hooks/useCart";
import {MdOutlineShoppingBag, MdOutlineLocalShipping, MdOutlineCalendarMonth } from 'react-icons/md';

export default function ProductDetailsPage() {

    const { id } = useParams();
    const { data, loading, error } = useFetch('https://itx-frontend-test.onrender.com/api/product/'+id);

    const [color, setColor] = useState('');
    const [storage, setStorage] = useState('');

    const { addToCart, errorCart, loadingCart  } = useCart();

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para agregar al carrito
        console.log(`color:${color} - storage:${storage}`);
        addToCart({
            id: data.id,
            color: color,
            storage: storage,
        });

    }

    useEffect(() => {
        if (!data) return;
        if (data.options.colors && data.options.colors?.length == 1) setColor(data.options.colors[0].code);
        if (data.options.storages && data.options.storages?.length == 1) setStorage(data.options.storages[0].code);
    }, [data]);

    return (
        <>
            {loading && <p className="p-6">Cargando detalles del producto...</p>}
            {error && <p className="p-6" style={{color: 'red'}}>Error: {error.message}</p>}
            {data && <div className="p-6 flex justify-center items-center">
                
                <div className="bg-white w-[90%] rounded-lg grid grid-cols-1 md:grid-cols-6 gap-6 p-4">
                    <div className="w-full relative flex justify-center items-start h-full col-span-3 rounded-lg p-4">
                        <img src={data.imgUrl} alt={data.model} className="h-[30vh] sm:h-[50vh] sticky top-[150px] object-cover rounded" />
                    </div>
                    <div id="crc" className="col-span-3">
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
                                <form onSubmit={handleSubmit}>
                                    <div className="grid grid-cols-2 gap-4">
                                        <RadioButton
                                            object={data.options.colors}
                                            label="Color"
                                            name="color"
                                            value={color}
                                            handle={handleColorChange}
                                        />
                                        <RadioButton
                                            object={data.options.storages}
                                            label="Storage"
                                            name="storage"
                                            value={storage}
                                            handle={handleStorageChange}
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="h-12 bg-(--primary-color) text-(--primary-color-on) flex justify-center items-center px-4 py-2 rounded hover:bg-(--primary-color-dark) disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors w-full mt-8"
                                        disabled={data.price == '' || color == '' || storage == ''}    
                                    >   
                                        {!loadingCart && <><MdOutlineShoppingBag size={16} className="mr-2"/> Add to Cart</>}
                                        {loadingCart && <div>
                                            <span class="loader"></span>
                                        </div>}
                                    </button>
                                    <p className={`text-xs h-6 mt-1 flex items-center ${errorCart ? 'text-red-500' : 'text-(--text-light)'}`}>
                                        {
                                            (data.price == '') 
                                                ? 'Items is not available' 
                                                : (color == '' || storage == '') 
                                                    ? 'Please select all the available options' 
                                                    : (errorCart ? 'Is not possible to add the product' : '')
                                        }
                                    </p>
                                </form>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center border border-solid border-(--secondary-color-light) p-2 rounded mt-4">
                                        <MdOutlineLocalShipping size={35} className="mr-2 text-(--primary-color)"/>
                                        <div>
                                            <p className="text-sm text-(--text-light) font-semibold">Estimated Delivery</p>
                                            <p className="text-sm text-(--text-light)">3-5 business days</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center border border-solid border-(--secondary-color-light) p-2 rounded mt-4">
                                        <MdOutlineCalendarMonth size={35} className="mr-2 text-(--primary-color)"/>
                                        <div>
                                            <p className="text-sm text-(--text-light) ">Free return within <b>30 days</b> of purchase.</p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                            
                            {/* Especificaciones técnicas */}
                            <div className="text-sm text-(--text-light)">
                                <h4 className="mb-4 text-(--primary-color) font-semibold text-base">Description</h4>
                                <p className="mb-4"><b>Reference</b><br/> {data.id}</p>
                                <ul className="mb-4">
                                    {data.cpu && <li className="mb-2 flex flex-col" key="cpu"><b>CPU:</b> - {data.cpu}</li>}
                                    {data.ram && <li className="mb-2 flex flex-col" key="ram"><b>RAM:</b> - {data.ram}</li>}
                                    {data.os && <li className="mb-2 flex flex-col" key="os"><b>OS:</b> - {data.os}</li>}
                                    {data.displayResolution && <li className="mb-2 flex flex-col" key="displayResolution"><b>Display Resolution:</b> - {data.displayResolution}</li>}
                                    {data.battery && <li className="mb-2 flex flex-col" key="battery"><b>Battery:</b> - {data.battery}</li>}
                                    {data.primaryCamera && Array.isArray(data.primaryCamera) && (
                                        <li className="mb-2 flex flex-col" key="primaryCamera">
                                            <b>Primary Camera:</b>
                                            <ul>
                                                {data.primaryCamera.map((i, idx) => <li key={"primaryCamera-"+idx}>- {i}</li>)}
                                            </ul>
                                        </li>
                                    )}
                                    {data.primaryCamera && !Array.isArray(data.primaryCamera) && <li className="mb-2 flex flex-col" key="primaryCamera"><b>Primary Camera:</b> - {data.primaryCamera}</li>}
                                    {data.secondaryCmera && Array.isArray(data.secondaryCmera) && (
                                        <li className="mb-2 flex flex-col" key="secondaryCamera">
                                            <b>Secondary Camera:</b>
                                            <ul>
                                                {data.secondaryCmera.map((i, idx) => <li key={"secondaryCamera-"+idx}>- {i}</li>)}
                                            </ul>
                                        </li>
                                    )}
                                    {data.secondaryCmera && !Array.isArray(data.secondaryCmera) && <li className="mb-2 flex flex-col" key="secondaryCamera"><b>Secondary Camera:</b> - {data.secondaryCmera}</li>}
                                    {data.dimentions && data.dimentions !== '-' && <li className="mb-2 flex flex-col" key="dimentions"><b>Dimentions:</b> - {data.dimentions}</li>}
                                    {data.weight && <li className="mb-2 flex flex-col" key="weight"><b>Weight:</b> - {data.weight} g</li>}
                                </ul>
                            </div>
                            

                        </div>
                        
                        
                    </div>
                </div>
            </div>}
        </>
        
    );
}