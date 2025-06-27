// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    reducer: () => ({}), // 빈 리듀서 (추후 교체 예정)
});

// 타입 추론용
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;