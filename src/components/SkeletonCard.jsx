import React from "react";
import "./style/Skeleton.css";

/**
 * Componente que muestra una tarjeta esqueleto mientras se cargan los datos del producto.
 * 
 * Muestra bloques grises animados en lugar de contenido real.
 * @returns {JSX.Element} Componente SkeletonCard
 */

export default function SkeletonCard() {
    return (
        <div className="bg-white p-4 rounded-lg shadow-(--boxshadow)">
            <div className="w-full flex justify-center items-center mb-4 h-75">
                <div className="h-[80%] w-32 bg-gray-200 rounded animate-pulse" />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="col-span-2">
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
                </div>
                <div className="h-6 bg-gray-200 rounded w-2/3 col-start-2 justify-self-end animate-pulse" />
            </div>
            <div className="bg-gray-200 h-10 rounded w-full animate-pulse" />
        </div>
    );
}
