import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

import adoptedPet from "./adoptedPetSlice";

const store = configureStore({
  reducer: {
    adoptedPet,
  },
});

export type IRootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default store;
