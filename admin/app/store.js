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
export default configureStore({reducer:{
  book:bookReducer,
  cart:cartReducer,
  inventory:inventoryReducer,
  currencyFilter:currencyFilterReducer,
  search:searchTermReducer,
  orders:ordersReducer,
  user:userReducer
}})
//export default createStore(rootReducer);
