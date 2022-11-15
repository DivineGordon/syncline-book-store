/*
TODO:
1. Create a function called searchTermReducer that can handle the following action types:
    * 'searchTerm/setSearchTerm'
    * 'searchTerm/clearSearchTerm'
    * Don't forget to set the initial state and return state by default!


const initialState={searchTerm:""};

export const searchTermReducer=(state=initialState,action)=>{
 switch (action.type){
    case 'searchTerm/setSearchTerm':
        return {searchTerm:action.payload};
    case 'searchTerm/clearSearchTerm':
        return initialState
    default:
        return state
 }


}

2. Create a function called setSearchTerm
    * It has one parameter, term
    * It returns an action object whose payload is the term value
    * See SearchTerm.js for how this will be used.

export const setSearchTerm=(term)=>({type:'searchTerm/setSearchTerm',payload:term});


3. Create a function called clearSearchTerm
    * It returns an action object with no payload
    * See SearchTerm.js for how this will be used.


export const clearSearchTerm=()=>({type:'searchTerm/clearSearchTerm'});
*/
import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
const initialState={searchTerm:"",results:null};

const slice=createSlice({
name:'search',
initialState,
reducers:{
   
    clearSearchTerm(s){
        s.searchTerm=''
    }
},
extraReducers:(b)=>{
 b.addCase(searchDBproducts.pending,(s,a)=>{
        s.searchTerm=a.meta.arg
})
}
})

export const searchTermReducer=slice.reducer
export const {setSearchTerm,clearSearchTerm}=slice.actions
export const searchDBproducts=createAsyncThunk('search/products/api/fetch',async(title)=>{
// search db products
    const body=JSON.stringify({title})
    const headers={"Content-Type":'application/json'}
    try{
   const res=await fetch('/api/books/get',
   {headers, method:"POST",body})
   const data=await res.json()
   return data.books.map(v=>(v.unit_price=Number(v.unit_price),v))
    }catch(e){
        console.log(e)
        throw e
    }
})
