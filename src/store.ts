import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import adoptedPet from "./adoptedPetSlice";
import searchParams from "./searchParamsSlice";
import { petApi } from "./petApiService";

const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
    [petApi.reducerPath]: petApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(petApi.middleware),
});

export type IRootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default store;
