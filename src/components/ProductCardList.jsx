import React from "react";
import ProductCard from "./ProductCard";

/**
 * Componente que muestra una lista de tarjetas de productos.
 * 
 * Muestra una cuadrícula de ProductCard para cada producto en el array.
 * @param {object[]} products - Array de objetos de productos
 * @returns {JSX.Element} Componente ProductCardList
 */

export default function ProductCardList({ products }) {
    return (
        <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </ul>
    );
}
