import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.js';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (token) {
      fetchCart();
    } else {
      setItems([]);
    }
  }, [token]);

  const fetchCart = async () => {
    const res = await api.get('/cart');
    setItems(res.data);
  };

  const addItem = async (productId, quantity = 1) => {
    await api.post('/cart', { productId, quantity });
    fetchCart();
  };

  const updateItem = async (id, quantity) => {
    await api.put(`/cart/${id}`, { quantity });
    fetchCart();
  };

  const removeItem = async (id) => {
    await api.delete(`/cart/${id}`);
    fetchCart();
  };

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
