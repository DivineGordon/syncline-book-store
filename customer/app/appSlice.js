import { createSlice } from "@reduxjs/toolkit";
import {saveOrder} from '../features/cart/cartSlice'
import { getOrdersThunk } from "../features/orders/ordersSlice";
const slice=createSlice({
    name:'app',
    initialState:{
        message:'',
        count:0
    },reducers:{
        systemMessage(s,a){
            s.message=a.payload
            s.count=s.count+1
        }
    },
    extraReducers:(b)=>{
        b.addCase(saveOrder.rejected,s=>{
            s.message='Purchase error'
        }).addCase(saveOrder.fulfilled,s=>{
            s.message='Order success'
        }).addCase(getOrdersThunk.rejected,(s,a)=>{
           const index=a.error.message.indexOf('403')
           if(index!==-1){
            s.message='You need to login to see your orders'
           }
        })
    }
})
export const appReducer=slice.reducer
export const {systemMessage}=slice.actions