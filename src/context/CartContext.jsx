import { createContext, use, useContext, useState } from 'react';
import {useFetch} from '../hooks/useFetch';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(0);
  const {fetchData, loading, error, data} = useFetch('/api/cart', {}, false);

  const addToCart = async (product) => {
    try {

        /*console.log('Agregando al carrito:', product);

        const response = await fetchData({
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                id: product.id/*, 
                colorCode:product.color, 
                storageCode: product.storage/
            }),
        });

        if (response === null) throw new Error('Error al agregar producto al carrito');
        
        console.log('Respuesta del servidor:', response);*/

        setCartItems((prevItems) => prevItems + 1);

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
        errorCart:error
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
