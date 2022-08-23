import { createSlice } from '@reduxjs/toolkit'

let myData = JSON.parse(localStorage.getItem('usersData'));
let specialCase=false;
if(myData!==null){
  myData.map(each=>{
    if(each.isLoggedIn){
      specialCase = true;
    }
  })
}
const initialState = {
  numOfCakes: 20,
  data:specialCase
}

const cakeSlice = createSlice({
  name: 'cake',
  initialState,
  reducers: {
    ordered: state => {
      state.numOfCakes--
    },
    restocked: (state, action) => {
      state.numOfCakes += action.payload
    },
    updateLoginStatus:(state,action)=>{
        state.data = action.payload
    }
  }
})

export default cakeSlice.reducer
export const { ordered, restocked,updateLoginStatus } = cakeSlice.actions