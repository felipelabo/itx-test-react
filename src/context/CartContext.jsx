import { createContext, use, useContext, useState } from 'react';
import {useFetch} from '../hooks/useFetch';

/**
 * Contexto para el carrito de compras.
 * 
 * Proporciona estado y funciones para manejar el carrito de compras.
 */

export const CartContext = createContext();

const CACHE_TTL = import.meta.env.VITE_CART_CACHE_TTL ? parseInt(import.meta.env.VITE_CART_CACHE_TTL) : 3600000; // 1 hora por defecto

export function CartProvider({ children }) {
  const {fetchData, loading, error, data} = useFetch(import.meta.env.VITE_API_ADD_URL, {}, false);

  // Función para escribir cache en localStorage
  const writeCacheItem = (key, value, ttl) => {
      const now = new Date();
      const item = {
          value: value,
          expiry: now.getTime() + ttl,
      };
      console.log('Setting item with TTL in localStorage for key', key, ':', item);
      localStorage.setItem(key, JSON.stringify(item));
      console.log('Item set successfully: ', localStorage.getItem(key));
  };

  // Función para leer cache desde localStorage
  const readCacheItem = (key) => {
      const itemStr = localStorage.getItem(key);
      console.log('Retrieved itemStr from localStorage for key', key, ':', itemStr);
      if (!itemStr) return null;
      const item = JSON.parse(itemStr);
      const now = new Date();
      if (now.getTime() > item.expiry) {
          localStorage.removeItem(key);
          return null;
      }
      console.log('Item valid for key', key, ':', item);
      return item.value;
  };
  
  // Inicializar cartItems desde localStorage con TTL de 1 hora
  const storedCount = readCacheItem('cartItemsCount');
  const [cartItems, setCartItems] = useState(storedCount ? parseInt(storedCount) : 0);

  const addToCart = async (product) => {
    try {
        console.log('addToCart:', product);

        const response = await fetchData({
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id: product.id, 
                colorCode:product.color, 
                storageCode: product.storage
            }),
        });

        if (response === null) throw new Error('Error al agregar producto al carrito');
        console.log('response:', response);

        // Actualizar cartItems y localStorage
        setCartItems((prevCount) => prevCount + response.count);
        writeCacheItem('cartItemsCount', (cartItems + response.count), CACHE_TTL); // 1 hora en milisegundos

    } catch (error) {
        console.error(error);
        // Manejo de errores
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        loadingCart:loading,
        errorCart:error,
        dataCart:data
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
