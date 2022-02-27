import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as any,
  reducers: {
    addToCart: (state, action) => {
      const itemExists: any = state.find(
        (item: any) => item._id === action.payload._id
      );

      if (itemExists) {
        itemExists.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item: any = state.find((item: any) => item._id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item: any = state.find((item: any) => item._id === action.payload);
      if (item.quantity === 1) {
        const index = state.findIndex(
          (item: any) => item._id === action.payload
        );
        state.splice(index, 1);
      } else {
        item.quantity--;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.findIndex((item: any) => item._id === action.payload);
      state.splice(index, 1);
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
} = cartSlice.actions;

export default cartSlice.reducer;
