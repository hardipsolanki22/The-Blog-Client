import { configureStore } from "@reduxjs/toolkit";

import authSlice from '../featured/authSlice.js'

export const store = configureStore({
    reducer: {
        auth: authSlice
    }
})