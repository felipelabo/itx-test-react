import { Link, useLocation } from 'react-router';
import { useCart } from '../context/CartContext';
import '../components/style/Header.css';
import BreadcrumBar from './BreadcrumBar';

export default function Header() {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();

  return (
    <header className="sticky top-0 z-50">
      {/* Navbar principal */}
      <div>
        <p className='w-full text-xs bg-(--primary-color) text-(--primary-color-on) text-center p-1'>Free shipping to España on all orders above €200.00</p>
      </div>
      <nav className="bg-(--primary-color-on) text-(--primary-color)">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-15">
            <div className="flex-1" />
            {/* Titulo - Enlace a la página principal */}
            <Link to="/" id="title" className="flex items-center justify-center space-x-2 hover:opacity-80 transition-opacity" style={{ flex: 'none' }}>
              <span className="text-3xl font-bold">AMS Solutions</span>
            </Link>
            <div className="flex-1 flex justify-end">
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
        </div>
      </nav>

      {/* Barra de breadcrumbs */}
      <BreadcrumBar location={location} />
      
    </header>
  );
}
