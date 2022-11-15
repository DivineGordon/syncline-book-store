// Import createStore and combineReducers here.
import {createStore,combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// Import the slice reducers here.
import {cartReducer} from '../features/cart/cartSlice.js';
import {inventoryReducer} from '../features/inventory/inventorySlice.js';
import {currencyFilterReducer} from '../features/currencyFilter/currencyFilterSlice.js';
import { searchTermReducer } from '../features/searchTerm/searchTermSlice2';
import ordersReducer from '../features/orders/ordersSlice'
import userReducer from '../features/user/userSlice.js';
import { bookReducer } from '../features/productView/singleProductSlice.js';
//const rootReducer=combineReducers()
const store= configureStore({reducer:{
  book:bookReducer,
  cart:cartReducer,
  inventory:inventoryReducer,
  currencyFilter:currencyFilterReducer,
  search:searchTermReducer,
  orders:ordersReducer,
  user:userReducer
}})
//export default createStore(rootReducer);
export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const getRDXUser=(s:RootState)=>s.user
