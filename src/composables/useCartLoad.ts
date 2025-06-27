import { useEffect } from 'react';
import { useAppSelector } from '../store/hooks';

export const CART_ITEM = 'CART_ITEM';

export const useCartLoad = () => {
  const cartStore = useAppSelector((state) => state.cart.items);
  const setCartData = () => {
    localStorage.setItem(CART_ITEM, JSON.stringify(cartStore));
  };
  useEffect(() => {
    setCartData();
  }, [cartStore]);
};