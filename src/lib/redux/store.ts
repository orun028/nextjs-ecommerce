import { configureStore, Store, createSlice } from '@reduxjs/toolkit'
import cartReducer from './slice/cart';

const counterSlice = createSlice({
  name: 'bank',
  initialState: {
    idPage: null
  },
  reducers: {
    setPageId: (state: {idPage: null | string}, action) => {
      state.idPage = action.payload
    },
    removePageId: (state: {idPage: null | string}) => {
      state.idPage = null
    },
  }
})

export const { setPageId, removePageId } = counterSlice.actions

const store: Store = configureStore({
  reducer: {
    cart: cartReducer,
    bank: counterSlice.reducer
  }
})
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
