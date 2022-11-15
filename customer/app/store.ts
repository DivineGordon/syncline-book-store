// Import createStore and combineReducers here.
import {createStore,combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// Import the slice reducers here.
import {cartReducer} from '../features/cart/cartSlice';
import {inventoryReducer} from '../features/inventory/inventorySlice.js';
import {currencyFilterReducer} from '../features/currencyFilter/currencyFilterSlice.js';
import { searchTermReducer } from '../features/searchTerm/searchTermSlice.js';
import ordersReducer from '../features/orders/ordersSlice'
//const rootReducer=combineReducers()
import {appReducer} from './appSlice'
import  userReducer  from '../features/user/userSlice';
const store= configureStore({reducer:{ 
  app:appReducer, 
  user:userReducer,
  orders:ordersReducer,
  cart:cartReducer,
  inventory:inventoryReducer,
  currencyFilter:currencyFilterReducer,
  search:searchTermReducer
}})
//export default createStore(rootReducer);
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const getRDXUser=(s:RootState)=>s.user
