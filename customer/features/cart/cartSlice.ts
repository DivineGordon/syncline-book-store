import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {saveOrderMongo } from './mongodb'
/*
export const addItem = (itemToAdd) => {
    return {
      type: 'cart/addItem',
      payload: itemToAdd,
    };
  };
  
  
  export const changeItemQuantity=(name,newQuantity)=>{
    return {
      type:'cart/changeItemQuantity',
      payload:{
        name,
        newQuantity
      }
    }
  }
  */
 type ProductType=any
 interface Cart {
 [productId: string]:{ title: String,
  description?:string,
  img?:string,
    picture?:string,
    quantity:number,
    unit_price:number,
  amount:number,
  p_qty?:number,
}
 }
 type APIState='idle'|'rejected'|'pending'|'ff'|'fulfilled'
  const initialCart = {cart:{} as Cart,
  itemsCount:0 as number,
  apiLoading:{state:'idle' as APIState,id:'' as string}};
  const slice=createSlice({
    name:'cart',
    initialState:initialCart,
    reducers:{
      addItem(cart,action){
        let {  unit_price:price,img ,_id} = action.payload;
  
        // if the item already exists, increase the quantity by 1, otherwise set it to 1
        let item=cart.cart[_id];
        const p_qty = item  ? item.p_qty+1  : 1;
        const amount=item ? item.amount + price : price;
        if(!item)item=action.payload;
        const newItem = {...item,price, p_qty,amount};
  
        // Add the new item to the cart (or replace it if it existed already)
        return {...cart,
		 cart:{...cart.cart,
			  [_id]: newItem,
		  },
			itemsCount:cart.itemsCount+1
        };
      },
      changeItemQuantity(cart,action){
        const {_id:name, newQuantity } = action.payload;
        const itemToUpdate = cart.cart[name];
        //TODO: fix precision
        // Create a copy of itemToUpdate and update the quantity prop.
		const diff=newQuantity-itemToUpdate.p_qty;
        const updatedItem={...itemToUpdate,
        p_qty:newQuantity,
        amount: (itemToUpdate.unit_price * newQuantity)
        }
   
        
        return {...cart,
          cart:{...cart.cart,
			  [name]:updatedItem
		  },
          itemsCount:cart.itemsCount+diff
		 
        };
      },
      removeItem(cart,action){
        const name=action.payload as string;
        const old= cart.cart[name];
       const  newCart={...cart,
         cart:{...cart.cart} , 
         itemsCount:cart.itemsCount-old.quantity  
         }
         delete newCart.cart[name];
         return newCart
      }
      
    },
    extraReducers:(b)=>{
b.addCase(saveOrder.fulfilled,(s,a)=>{
  s.cart={}
  s.itemsCount=0
  s.apiLoading.state='ff'
  s.apiLoading.id=a.meta.requestId
}).addCase(saveOrder.pending,(s,a)=>{
  s.apiLoading.state='pending'
  s.apiLoading.id=a.meta.requestId
}).addCase(saveOrder.rejected,(s,a)=>{
  s.apiLoading.state='rejected'
  s.apiLoading.id=a.meta.requestId
  
})
    }
  })
  export const cartReducer=slice.reducer
  export const {changeItemQuantity,addItem,removeItem}=slice.actions
  /*export const cartReducer = (cart = initialCart, action) => {
    switch (action.type) {
      case 'cart/addItem': {
        let {  unit_price:price,img ,_id} = action.payload;
  
        // if the item already exists, increase the quantity by 1, otherwise set it to 1
        let item=cart.cart[_id];
        const p_qty = item  ? item.p_qty+1  : 1;
        const amount=item ? item.amount + price : price;
        if(!item)item=action.payload;
        const newItem = {...item,price, p_qty,amount};
  
        // Add the new item to the cart (or replace it if it existed already)
        return {
		 cart:{...cart.cart,
			  [_id]: newItem,
		  },
			itemsCount:cart.itemsCount+1
        };
      }
      case 'cart/changeItemQuantity': {
        const { name, newQuantity } = action.payload;
        const itemToUpdate = cart.cart[name];
        //TODO: fix precision
        // Create a copy of itemToUpdate and update the quantity prop.
		const diff=newQuantity-itemToUpdate.p_qty;
        const updatedItem={...itemToUpdate,
        p_qty:newQuantity,
        amount: (itemToUpdate.price * newQuantity)
        }
   
        
        return {
			
          cart:{...cart.cart,
			  [name]:updatedItem
		  },
          itemsCount:cart.itemsCount+diff
		 
        };
      }
    case 'save/Order/MongoDB':{
      return ({cart:{},itemsCount:0})
    };
	  case 'cart/removeItem':{
		  const name=action.payload;
		 const old= cart.cart[name];
		const  newCart={
			cart:{...cart.cart} , 
			itemsCount:cart.itemsCount-old.quantity  
		  }
		  delete newCart.cart[name];
		  return newCart
	  }
      default: {
        return cart;
      }
    }
  };*/
  
  /*export const removeItem=(name)=>{
	 return {
		 type:'cart/removeItem',
		 payload:name
	 }
  }*/

  export const  saveOrder=createAsyncThunk(
    'save/Order/MongoDB',async (order,api)=>{
   const root=api.getState() as RootState
   
   if(!root.user){
    return api.rejectWithValue('no user')
   } 
    return  await saveOrderMongo(order)
  })