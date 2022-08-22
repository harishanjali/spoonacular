import { configureStore } from '@reduxjs/toolkit'
import dataReducer from './reducers/reducer'
const store = configureStore({
  reducer: {
    cake: dataReducer
  }
})

export default store