import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import adoptedPet from "./adoptedPetSlice";
import searchParams from "./searchParamsSlice";

const store = configureStore({
  reducer: {
    adoptedPet,
    searchParams,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default store;
