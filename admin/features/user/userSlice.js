import { createSlice,createAsyncThunk } from "@reduxjs/toolkit"
import {getUser} from './mongodb'
const userslice=createSlice({
    name:'user',
    initialState:null,
   reducers:{
changeUser(s,a){
return {...a.payload}
}
   },
   /* extraReducers:(b)=>{
      b.addCase(getUserThunk.fulfilled,(s,a)=>{
        return {...a.payload}
      })
    }*/
  })
  //export const getUserThunk=createAsyncThunk('get/user/Mongodb',async ()=>{
  //return await getUser()
  //})
 export default userslice.reducer
export const {changeUser  }= userslice.actions