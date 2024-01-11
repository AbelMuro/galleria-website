import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './Reducers';

const Store = configureStore({
    reducer: rootReducer
})

export default Store;