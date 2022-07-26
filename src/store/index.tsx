import { configureStore } from '@reduxjs/toolkit'

import addProductReducer from './addProductReducer'

export const store = configureStore({ reducer: addProductReducer })