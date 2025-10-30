import { Link, useLocation } from 'react-router';
import '../components/style/Header.css';
import BreadcrumBar from './BreadcrumBar';
import {MdOutlineShoppingCart} from 'react-icons/md';
import { useCart } from '../hooks/useCart';

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
              {/* Icono del carrito con contador */}
              <div className="relative">
                <button className="flex items-center space-x-2 hover:opacity-80 transition-opacity p-2">
                    <MdOutlineShoppingCart size={28} className="text-(--primary-color)" />
                </button>
                {/* Contador de items */}
                {cartItems > 0 && (
                <div className="absolute -top-1 -right-1 bg-(--secondary-color-light) text-(--secondary-color-on) text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems > 99 ? '99+' : cartItems}
                </div>
                )}
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
