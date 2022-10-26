import React,{useEffect, useState} from 'react';
import { Inventory } from '../features/inventory/Inventory.js';
import { CurrencyFilter } from '../features/currencyFilter/CurrencyFilter.js';
import { SearchTerm } from '../features/searchTerm/SearchTerm.js';
import {Cart} from '../features/cart/Cart.js';
import {useDispatch, useSelector} from "react-redux";
import { clearSearchTerm } from '../features/searchTerm/searchTermSlice.js';
import { BrowserRouter as Router,Routes,Route,useNavigate, Navigate } from 'react-router-dom';
import { OrdersList } from '../features/orders/Orders';
import {OrderDetail} from '../features/orders/OrderDetail';
import { Nav } from '../../Navigation.js';
import { getLocalUser } from '../utilities/auth.js';
import {changeUser} from '../features/user/userSlice'
export const BackButton=(props)=>{
  const navigate=useNavigate()
  const {cartButton,nO,page,alone}=props;
 const  onClick=()=>{navigate(page)}
 let button;
if(cartButton){
  button= (<button style={{position:"sticky",top:"10%",right:"5%",float:"right"}} onClick={onClick}  
  className='w3-btn w3-xlarge w3-round-xxlarge w3-border'>
    <i className="fa fa-cart-plus" aria-hidden="true">
      </i><sup className="w3-border w3-red w3-round-xlarge">{nO}</sup></button>)
}
else button= <button style={{float:"right"}} onClick={onClick}  
className='w3-btn currency-button selected'>BACK</button>


if(alone) return <div className='w3-container'>
<div id="currency-filters-container">
  {button}
  </div></div>;
return button
};

const OrdersButton=()=>{
  const navigate=useNavigate()
  const onClick=()=>{navigate('/static/orders')}
  return <button style={{float:"right"}} onClick={onClick}  
  className='w3-btn w3-xlarge w3-round-xxlarge w3-border w3-margin-right'>Orders</button>
}
export const App = (props) => {
//const [checkout,setCheckout]=useState(false)
const appMessage=useSelector(s=>s.app.message)
const appMessageCount=useSelector(s=>s.app.count)
const user=useSelector(s=>s.user)
let inventory=useSelector(state=>state.inventory.initialInventory);
const searchResults=useSelector(state=>state.inventory.searchInventory);
//const onCheckout=()=>setCheckout(true);
const dispatch=useDispatch();
const searchTerm=useSelector(state=>state.search.searchTerm);

const nO=useSelector(s=>s.cart.itemsCount)
useEffect(()=>{
  if(appMessage==='')return;
  var chat=document.getElementById("chat-snackbar");
  chat.MaterialSnackbar.showSnackbar({message:appMessage,timeout:4e3})

},
[appMessage,appMessageCount])
useEffect(()=>{
if(user)return;
 dispatch(changeUser( getLocalUser()))
//dispatch( getUserThunk())
},[user])
let userNav=null;
if(user)userNav={...user,displayName:user.username,uid:user.id};
const onLogout=()=>{
  window.localStorage.removeItem('user')
}
const menu_items=[['/static/index.html','Home'],["/static/books/catalogue","Books"],
["/static/orders","Orders"],['/static/books/checkout','Cart'],
['/static/login/index.html','Login']];
return (
<Router>
  <Nav    menu={menu_items}
  onLogout={onLogout } logout_path="/static/login/index.html" user={userNav} />
<Routes>
  <Route path='/static/orders'>
    <Route index element={<OrdersList />} />
    <Route path='detail/:orderId' element={<OrderDetail  />} />
  </Route>
    <Route  path='/static/books/checkout' element={
(
  <div className="w3-main" style={{marginLeft:250}}>
    <CurrencyFilter
    dispatch={dispatch}
  ><BackButton page={'/static/books/catalogue'} /></CurrencyFilter>
  
    <Cart 
    summary={false}
    />
    </div>
  )

    }  />

<Route path='/static/books/catalogue' element={
  (
    
    
   
    <div className='w3-container'>
      <div className='w3-container'>
      <CurrencyFilter
        dispatch={dispatch}
      > { searchTerm ?
        <BackButton onClick={()=>{dispatch(clearSearchTerm())}} />:
        <BackButton nO={nO} page={'/static/books/checkout'} cartButton={true}/>
        }
          <OrdersButton />
        </CurrencyFilter></div>
      
     
      <SearchTerm  dispatch={dispatch} />
      <Inventory
        dispatch={dispatch}
        inventory={inventory}
        searchTerm={searchTerm}
      />
      <Cart 
      summary={true}
      //onCheckout={onCheckout}
      />

    </div>
  )
} />
<Route path='/static/index.html' element={
  <Navigate to={'/static/books/catalogue'} />
  /*(
    <div className='w3-container'>
      <div className='w3-container'>
      <CurrencyFilter
        dispatch={dispatch}
      > { searchTerm ?
        <BackButton onClick={()=>{dispatch(clearSearchTerm())}} />:
        <BackButton nO={nO} page={'/static/books/checkout'} cartButton={true}/>
        }
          <OrdersButton />
        </CurrencyFilter></div>
      
     
      <SearchTerm  dispatch={dispatch} />
      <Inventory
        dispatch={dispatch}
        inventory={inventory}
        searchTerm={searchTerm}
      />
      <Cart 
      summary={true}
      //onCheckout={onCheckout}
      />

    </div>
  )*/
} />
    </Routes>
    </Router>
   );


/*
if(checkout){
  return (
  <div className="w3-main" style={{marginLeft:250}}>
    <CurrencyFilter
    dispatch={dispatch}
  ><BackButton onClick={()=>{setCheckout(false)}} /></CurrencyFilter>
  
    <Cart 
    summary={false}
    />
    </div>
  )
}

if (searchTerm)inventory=searchResults;
  return (
    <div className='w3-container'>
      <div className='w3-container'>
      <CurrencyFilter
        dispatch={dispatch}
      > { searchTerm ?
        <BackButton onClick={()=>{dispatch(clearSearchTerm())}} />:
        <BackButton nO={nO} onClick={()=>{setCheckout(true)}} cartButton={true}/>
        }
          
        </CurrencyFilter></div>
      
     
      <SearchTerm  dispatch={dispatch} />
      <Inventory
        dispatch={dispatch}
        inventory={inventory}
        searchTerm={searchTerm}
      />
      <Cart 
      summary={true}
      onCheckout={onCheckout}
      />

    </div>
  );
  */
};
