import { createSlice } from "@reduxjs/toolkit";
import { food_list } from "../assets/assets";

const initialState = {
  cartItems: {},
  food_list: food_list,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems[itemId] = state.cartItems[itemId]
        ? state.cartItems[itemId] + 1
        : 1;
    },

    removeFromCart: (state, action) => {
      const itemId = action.payload;
      if (state.cartItems[itemId]) {
        state.cartItems[itemId] -= 1;
        if (state.cartItems[itemId] === 0) {
          delete state.cartItems[itemId];
        }
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
