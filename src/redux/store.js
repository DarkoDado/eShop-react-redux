import { combineReducers, configureStore } from "@reduxjs/toolkit"
import productsReducer from "./slice/productsSlice"
import filterReducer from "./slice/filterSortSlice"

const rootReducer = combineReducers({
    products: productsReducer,
    filter: filterReducer
})

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store