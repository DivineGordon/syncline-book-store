//import { inventoryData } from '../../../data.js';
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { searchDBproducts } from '../searchTerm/searchTermSlice.js';
import { authHeader } from '../../utilities/auth.js';
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
    b.addCase(loadData.fulfilled,(s,a)=>{
      s.initialInventory=a.payload
      s.storage=[...a.payload]
      s.apiLoading='ff'
    }).addCase(searchDBproducts.fulfilled,(s,a)=>{
      s.initialInventory=a.payload
      s.apiLoading='ff'
    }).addCase('search/clearSearchTerm',(s)=>{
      s.initialInventory=s.storage
    }).addMatcher(a=>{
      
      const index=a.type.indexOf('api/fetch/pending')
      return index!==-1
    },s=>{
      s.apiLoading='pending'
      
    })
  }
    /*'searchTerm/setSearchTerm':(state,action)=>{
      const test=new RegExp(action.payload,'i');
      const data=state.initialInventory.filter((v)=>test.test(v.name))
   state.searchInventory=data.length?data:null;
    },
    'searchTerm/clearSearchTerm':(state)=>{
      state.searchInventory=null;

    }*/


});


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
export const inventoryReducer=inventorySlice.reducer;