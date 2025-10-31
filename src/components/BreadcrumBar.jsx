import React from 'react';
import { Link } from 'react-router';

/**
 * Componente de barra de breadcrumbs.
 * 
 * Utilizado en la cabecera para mostrar la ruta de navegación.
 * @param {object} location - Objeto de ubicación de React Router
 * @returns {JSX.Element} Componente BreadcrumBar
 */

export default function BreadcrumBar({ location }) {

    const getBreadcrumbs = () => {
        const path = location.pathname;
        const breadcrumbs = [];

        // Siempre agregamos el inicio
        breadcrumbs.push({ name: 'Smarthphones & Tables', path: '/' });

        // Si estamos en la página de detalles del producto
        if (path.startsWith('/product/')) {
        breadcrumbs.push({ name: 'Product Details', path: path });
        }

        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();

    return (
        <div className="bg-(--primary-color-on) text-(--primary-color)">
            <div className="container mx-auto px-4 py-2">
                <nav className="flex items-center justify-center space-x-2 text-sm">
                    {breadcrumbs.map((breadcrumb, index) => (
                    <div key={breadcrumb.path} className="flex items-center">
                        {index > 0 && (
                        <svg
                            className="w-4 h-4 mx-2 text-(--secondary-color-light)"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                            />
                        </svg>
                        )}
                        
                        {index === breadcrumbs.length - 1 ? (
                        // Último breadcrumb - no es un enlace
                        <span className=" font-medium">
                            {breadcrumb.name}
                        </span>
                        ) : (
                        // Breadcrumbs anteriores - son enlaces
                        <Link
                            to={breadcrumb.path}
                            className="text-(--secondary-color-light) hover:text-(--primary-color-light) transition-colors"
                        >
                            {breadcrumb.name}
                        </Link>
                        )}
                    </div>
                    ))}
                </nav>
            </div>
        </div>
    );
}