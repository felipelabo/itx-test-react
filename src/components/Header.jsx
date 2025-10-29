import { Link, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';
import '../components/style/Header.css';

export default function Header() {
  const location = useLocation();
  const { getTotalItems } = useCart();
  
  // Función para generar los breadcrumbs basados en la ruta actual
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const breadcrumbs = [];

    // Siempre agregamos el inicio
    breadcrumbs.push({ name: 'Inicio', path: '/' });

    // Si estamos en la página de detalles del producto
    if (path.startsWith('/product/')) {
      breadcrumbs.push({ name: 'Detalles del Producto', path: path });
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();
  const cartItemCount = getTotalItems();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Navbar principal */}
      <nav className="bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Título - Enlace a la página principal */}
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-xl font-bold">Mi Tienda</span>
            </Link>

            {/* Icono del carrito con contador */}
            <div className="relative">
              <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity p-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                
                {/* Contador de items */}
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount > 99 ? '99+' : cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Barra de breadcrumbs */}
      <div className="bg-gray-100 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((breadcrumb, index) => (
              <div key={breadcrumb.path} className="flex items-center">
                {index > 0 && (
                  <svg
                    className="w-4 h-4 mx-2 text-gray-400"
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
                  <span className="text-gray-700 font-medium">
                    {breadcrumb.name}
                  </span>
                ) : (
                  // Breadcrumbs anteriores - son enlaces
                  <Link
                    to={breadcrumb.path}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {breadcrumb.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
