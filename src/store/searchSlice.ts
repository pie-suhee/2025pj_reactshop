import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export const fetchProducts = createAsyncThunk<Product[]>('search/fetchProducts', async () => {
  const res = await fetch('/products.json');
  return await res.json();
});

interface SearchState {
  products: Product[];
  query: string;
}

const initialState: SearchState = {
  products: [],
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export const { setQuery } = searchSlice.actions;
export default searchSlice.reducer;