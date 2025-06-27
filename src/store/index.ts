import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';

export const store = configureStore({
    reducer: {
        search: searchReducer,
    },
});

// 타입 추론용
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;