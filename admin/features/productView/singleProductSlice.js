import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import {saveBookMongo} from './mongodb'
const initialState ={
    id:null,
    currentStatus:null,
    currentProduct:null,
    apiLoading:'idle'
}
const slice=createSlice({
name:'book',
initialState,
reducers:{
    changeApiState(s,a){
        s.apiLoading=a.payload
    }
},
extraReducers:(b)=>{
b.addCase(saveBookThunk.fulfilled,(s,a)=>{
s.apiLoading=a.meta.requestStatus
}).addCase(saveBookThunk.rejected,(s,a)=>{
    s.apiLoading=a.meta.requestStatus
}).addCase(saveBookThunk.pending,(s,a)=>{
   s.apiLoading=a.meta.requestStatus
})
}
})
export const {changeApiState}=slice.actions
export const bookReducer=slice.reducer
export const saveBookThunk=createAsyncThunk('save/book/api',
/**
 * 
 * @param {{url:string,body:any}} data 
 */
async (data)=>{
await saveBookMongo(data)
})