// Import createStore and combineReducers here.
import {createStore,combineReducers} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// Import the slice reducers here.
import {cartReducer} from '../features/cart/cartSlice.js';
import {inventoryReducer} from '../features/inventory/inventorySlice.js';
import {currencyFilterReducer} from '../features/currencyFilter/currencyFilterSlice.js';
import { searchTermReducer } from '../features/searchTerm/searchTermSlice.js';
import ordersReducer from '../features/orders/ordersSlice'
//const rootReducer=combineReducers()
import {appReducer} from './appSlice'
import  userReducer  from '../features/user/userSlice';
export default configureStore({reducer:{ 
  app:appReducer, 
  user:userReducer,
  orders:ordersReducer,
  cart:cartReducer,
  inventory:inventoryReducer,
  currencyFilter:currencyFilterReducer,
  search:searchTermReducer
}})
//export default createStore(rootReducer);
