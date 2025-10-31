import React from "react";
import "./style/Skeleton.css";

/**
 * Componente que muestra los detalles esqueleto de un producto mientras se cargan los datos.
 * 
 * Muestra bloques grises animados en lugar de contenido real.
 * @returns {JSX.Element} Componente SkeletonProductDetails
 */

export default function SkeletonProductDetails() {
    return (
        <div id="product_details" className="bg-white w-[90%] rounded-lg grid grid-cols-1 md:grid-cols-6 gap-6 p-4">
            <div className="w-full relative flex justify-center items-start h-full col-span-3 rounded-lg p-4">
                {/*<div className="h-[30vh] sm:h-[50vh] w-48 bg-gray-200 rounded animate-pulse" />*/}
            </div>
            <div className="col-span-3">
                <div className="p-2 rounded-lg mb-4">
                    <div className="grid grid-cols-4 gap-4 mb-20">
                        <div className="col-span-3 flex flex-col justify-center items-start">
                            <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="col-span-1 flex justify-end items-start">
                            <div className="h-6 w-16 bg-gray-200 rounded animate-pulse" />
                        </div>
                    </div>
                    <div className="rounded-lg mb-3">
                        <div className="grid grid-cols-2 gap-4 mb-15">
                            <div className="h-10 bg-gray-200 rounded animate-pulse" />
                            <div className="h-10 bg-gray-200 rounded animate-pulse" />
                        </div>
                        <div className="h-12 bg-gray-200 rounded w-full mt-8 animate-pulse" />
                        <div className="h-6 bg-gray-200 rounded w-1/2 mt-2 animate-pulse" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="h-16 bg-gray-200 rounded animate-pulse" />
                        <div className="h-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <div className="mt-15">
                        <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
                        <div className="h-4 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
                        <div className="h-4 w-40 bg-gray-200 rounded mb-2 animate-pulse" />
                        <div className="h-4 w-28 bg-gray-200 rounded mb-2 animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}
