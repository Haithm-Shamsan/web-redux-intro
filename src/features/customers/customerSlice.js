import { createSlice } from "@reduxjs/toolkit";

const initialStateCustomer = {
  fullName: "",
  nationalID: null,
  createdAt: null,
};

const customerSlice = createSlice({
  name: "customer",
  initialState: initialStateCustomer,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        const { fullName, nationalID, createdAt } = action.payload;
        state.fullName = fullName;
        state.nationalID = nationalID;
        state.createdAt = createdAt;
      },
    },
    updateCustomer(state, action) {
      const { fullName } = action.payload;
      state.fullName = fullName;
      // Update other fields if necessary
    },
  },
});

export const { createCustomer, updateCustomer } = customerSlice.actions;
export default customerSlice.reducer;
