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
export const searchDBproducts=createAsyncThunk(
    'search/products/api/fetch',async(title)=>{

    const body=JSON.stringify({title})
    const headers={"Content-Type":'application/json'}
    try{
   const res=await fetch('/api/books/get',{headers, method:"POST",body})
   const data=await res.json()
   return data.books.map(v=>(v.unit_price=Number(v.unit_price),v))
    }catch(e){
        console.log(e)
        throw e
    }
})
