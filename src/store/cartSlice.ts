import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  count: number;
}

export interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const found = state.items.find((it) => it.id === itemId);
      if (found) {
        found.count += 1;
      } else {
        state.items.push({ id: itemId, count: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const itemId = action.payload;
      const found = state.items.find((it) => it.id === itemId);
      if (!found) return;
      found.count -= 1;
      if (found.count <= 0) {
        state.items = state.items.filter((it) => it.id !== itemId);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;