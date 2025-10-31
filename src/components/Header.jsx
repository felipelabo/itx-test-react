import { Link, useLocation } from 'react-router';
import '../components/style/Header.css';
import BreadcrumBar from './BreadcrumBar';
import {MdOutlineShoppingCart, MdOutlinePersonOutline, MdFavoriteBorder} from 'react-icons/md';
import { useCart } from '../hooks/useCart';

/**
 * Componente de la cabecera de la aplicación.
 * 
 * Incluye la barra de navegación principal y la barra de breadcrumbs.
 * @returns {JSX.Element} Componente Header
 */

export default function Header() {
  const location = useLocation();
  const {cartItems} = useCart();

  return (
    <header className="sticky top-0 z-50">
      {/* Navbar principal */}
      <div>
        <p className='w-full text-xs bg-(--primary-color) text-(--primary-color-on) text-center p-1'>Free shipping to Spain on all orders above €200.00</p>
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
                <button className="flex items-center justify-center space-x-2 hover:opacity-80 transition-opacity p-2 mx-2">
                    <MdFavoriteBorder size={28} className="text-(--primary-color) m-0" />
                    <span className="hidden sm:block text-xs text-(--primary-color) font-semibold">Wishlist</span>
                </button>
                <button className="flex items-center justify-center space-x-2 hover:opacity-80 transition-opacity p-2 mx-2">
                    <MdOutlinePersonOutline size={28} className="text-(--primary-color) m-0" />
                    <span className="hidden sm:block text-xs text-(--primary-color) font-semibold">Account</span>
                </button>
                {/* Icono del carrito con contador */}
                
                <button className="flex items-center justify-center space-x-2 hover:opacity-80 transition-opacity p-2 mx-2">
                    <div className="relative m-0">
                        <MdOutlineShoppingCart size={28} className="text-(--primary-color) m-0" />
                        {/* Contador de items */}
                        {cartItems > 0 && (
                            <div className="absolute -top-2.5 -right-2.5 bg-(--secondary-color-light) text-(--secondary-color-on) text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {cartItems > 99 ? '99+' : cartItems}
                            </div>
                        )}
                    </div>
                    
                    <span className="hidden sm:block text-xs text-(--primary-color) font-semibold">Cart</span>
                </button>

                    
            </div>
          </div>
        </div>
      </nav>

      {/* Barra de breadcrumbs */}
      <BreadcrumBar location={location} />

    </header>
  );
}
