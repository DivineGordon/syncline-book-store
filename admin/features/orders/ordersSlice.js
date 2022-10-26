import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
//import {saveOrder} from'../cart/cartSlice'
import { authHeader } from "../../utilities/auth";
import { changeUser } from "../user/userSlice";
const slice=createSlice({
    name:'orders',
    initialState:{
        orders:[],
        fetchCommand:'idle'
    },
    extraReducers:(b)=>{
b.addCase(getOrdersMongo.fulfilled,(s,a)=>{
s.orders=a.payload
s.fetchCommand='idle'
})
//.addCase(saveOrder.fulfilled,(s,a)=>{
  //  s.fetchCommand='fetch'
//})
.addCase(changeUser,(s,a)=>{
    s.fetchCommand='fetch'
}).addCase(getOrdersMongo.rejected,(s,a)=>{
    
    s.fetchCommand='idle'
    })
   

    }
})
export const getOrdersMongo=createAsyncThunk('orders/api/fetch',async ()=>{
    const headers={'Content-Type':'application/json',...authHeader()}
    //const body=JSON.stringify({user_id})
   const res=await fetch('/api/orders/get',{method:'POST',headers})
   const data=await res.json()
   return data.orders
})

export const getRDXOrders=(s)=>s.orders.orders
export const getOrders=(s)=>s.orders.orders
export default slice.reducer;