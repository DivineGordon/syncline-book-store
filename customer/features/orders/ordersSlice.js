import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {saveOrder} from'../cart/cartSlice'
import { authHeader } from "../../utilities/auth";
import { changeUser } from "../user/userSlice";
import {getOrdersMongo} from './mongodb'
const slice=createSlice({
    name:'orders',
    initialState:{
        orders:[],
        fetchCommand:'idle',
        apiLoading:'idle'
    },
    extraReducers:(b)=>{
b.addCase(getOrdersThunk.fulfilled,(s,a)=>{
s.orders=a.payload
s.fetchCommand='idle'
s.apiLoading='ff'
}).addCase(saveOrder.fulfilled,(s,a)=>{
    s.fetchCommand='fetch'
}).addCase(changeUser,(s,a)=>{
    s.fetchCommand='fetch'
}).addCase(getOrdersThunk.rejected,(s,a)=>{
    s.apiLoading='rejected'
    s.fetchCommand='idle'
    })
   

    }
})
export const getOrdersThunk=createAsyncThunk('orders/api/fetch',
async (user_id)=>{
   
   return await getOrdersMongo(user_id)
})

export const getRDXOrders=(s)=>s.orders.orders
export default slice.reducer;