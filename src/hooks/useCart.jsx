import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

/**
 * Hook para usar el contexto del carrito de compras.
 * @returns {object} Contexto del carrito de compras
*/

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}