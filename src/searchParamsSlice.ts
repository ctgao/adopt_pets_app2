import { createSlice } from "@reduxjs/toolkit";
import { Animal } from "./APIResponsesTypes";

interface ISearchParams {
  location: string;
  breed: string;
  animal: Animal;
}

const searchParamsSlice = createSlice({
  name: "searchParams",
  initialState: {
    value: {
      location: "",
      breed: "",
      animal: "" as Animal,
    },
  },
  reducers: {
    all: (
      state: { value: ISearchParams },
      action: { payload: ISearchParams }
    ) => {
      state.value = action.payload;
    },
  },
});

export const { all } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;
