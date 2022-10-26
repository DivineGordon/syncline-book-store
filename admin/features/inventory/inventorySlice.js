//import { inventoryData } from '../../../data.js';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { searchDBproducts } from '../searchTerm/searchTermSlice2';
import { authHeader } from '../../utilities/auth.js';
import { deleteBookMongo } from './mongodb.js';
/*
export const loadData = (data) => {
  return {
    type: 'inventory/loadData',
    payload: inventoryData,
  };
};*/

const initialInventory = {initialInventory:[],
searchInventory:null,
apiLoading:'idle',
storage:null

};
/*
export const inventoryReducer = (inventory = initialInventory, action) => {
  switch (action.type) {
    case 'inventory/loadData': {
      return action.payload
    }
    default: {
      return inventory;
    }
  }
};
*/
const inventorySlice=createSlice({
  name:"inventory",
  initialState: initialInventory,
  reducers:{
    
  },
  extraReducers:(b)=>{
b.addCase(deleteBookThunk.fulfilled,(s,a)=>{
  if(a.payload.message.indexOf('success')===-1){
    s.apiLoading='rejected';
    return;
  }
  s.initialInventory=s.initialInventory.filter(v=>v._id!==a.meta.arg)
  s.storage=s.storage.filter(v=>v._id!==a.meta.arg)
  s.apiLoading='ff'
}).addCase(loadData.fulfilled,(s,a)=>{
    s.initialInventory=a.payload
    s.storage=[...a.payload]
    s.apiLoading='ff'
  }).addCase(searchDBproducts.fulfilled,(s,a)=>{
    s.initialInventory=a.payload
    s.apiLoading='ff'
  }).addCase('search/clearSearchTerm',(s)=>{
    s.initialInventory=s.storage
  }).addMatcher(a=>{
    
    const index=a.type.indexOf('api/fetch/pending')||a.type.indexOf('api/pending')
    return index!==-1
  },s=>{
    s.apiLoading='pending'
    
  }).addMatcher(a=>{
    const index=a.type.indexOf('api/fetch/rejected')||a.type.indexOf('api/rejected')
    return index!==-1
  },s=>{
    s.apiLoading='rejected'
  })
  }
  /*
    'searchTerm/setSearchTerm':(state,action)=>{
      const test=new RegExp(action.payload,'i');
      const data=state.initialInventory.filter((v)=>test.test(v.name))
   state.searchInventory=data.length?data:null;
    },
    'searchTerm/clearSearchTerm':(state)=>{
      state.searchInventory=null;

    }*/
  

});



export const inventoryReducer=inventorySlice.reducer;

 export const deleteBookThunk=createAsyncThunk('delete/book/api',
 async (_id)=>{
return await deleteBookMongo(_id)
 })
 export const loadData=createAsyncThunk('initialInventory/api/fetch',async ()=>{
  const headers={...authHeader()}
  try{
  
  const res= await fetch('/api/books/get',{headers})
  const data= await res.json()
  return data.books.map(b=>(b.unit_price=Number(b.unit_price),b))
  }catch(e){
    console.log(e)
    throw e
  }
})