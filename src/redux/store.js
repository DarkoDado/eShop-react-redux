import { combineReducers, configureStore } from "@reduxjs/toolkit"
import productsReducer from "./slice/productsSlice"
import filterReducer from "./slice/filterSortSlice"
import cartReducer from "./slice/cartSlice"

const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer,
    cart: cartReducer,
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store