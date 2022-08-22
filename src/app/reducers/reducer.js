import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data:JSON.parse(localStorage.getItem('userData'))
}

const dataSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    localStorageInfo: (state,action) => {
      state.data = action.payload
    //   console.log(state.data);
    }
  }
})

export default dataSlice.reducer
export const { localStorageInfo} = dataSlice.actions