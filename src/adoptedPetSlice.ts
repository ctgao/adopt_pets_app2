import { createSlice } from "@reduxjs/toolkit";
import { Pet } from "./APIResponsesTypes";

export const adoptedPetSlice = createSlice({
  name: "adoptedPet",
  initialState: {
    value: {} as Pet,
  },
  reducers: {
    adopt: (state: { value: Pet }, action: { payload: Pet }) => {
      state.value = action.payload;
    },
  },
});

// Brian Holt thinks it is synonymous to this function
// function adopt (pet) {
//   return { type: "adopt", payload: pet }
// }
// that line underneath us looks so much better right?
export const { adopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
