import { Store, combineReducers, createStore } from '@reduxjs/toolkit'
import cartReducer from './slice/cart';
import { persistReducer } from 'redux-persist'
import storage from './storage'
import { useMemo } from 'react';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'], // place to select which state you want to persist
}
const rootReducer = combineReducers({cart: cartReducer})
const persistedReducer = persistReducer(persistConfig, rootReducer)

let store: Store | undefined = createStore(persistedReducer)

function makeStore(initialState: any) {
  return createStore(
    persistedReducer,
    initialState= store && store.getState()
  )
}
export const initializeStore = (preloadedState: any) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}
export function useStore(initialState: any) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch