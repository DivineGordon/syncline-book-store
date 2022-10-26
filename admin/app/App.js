import React,{useState,useEffect} from 'react';
import { Inventory } from '../features/inventory/Inventory.js';
import { CurrencyFilter } from '../features/currencyFilter/CurrencyFilter.js';
import { SearchTerm } from '../features/searchTerm/SearchTerm2';
import {Cart} from '../features/cart/Cart.js';
import {useDispatch, useSelector} from "react-redux";
import { clearSearchTerm } from '../features/searchTerm/searchTermSlice.js';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import {OrdersList } from '../features/orders/Orders'
import {EditView} from '../features/productView/SingleProduct'
import { OrderDetail } from '../features/orders/OrderDetail';
import { Nav } from '../../Navigation.js';
import { changeUser } from '../features/user/userSlice.js';
const BackButton=(props)=>{
  const {cartButton,onClick,nO}=props;
if(cartButton){
  return  (<button style={{position:"sticky",top:"10%",right:"5%",float:"right"}} onClick={onClick}  
  className='w3-btn w3-xlarge w3-round-xxlarge w3-border'>
    <i className="fa fa-cart-plus" aria-hidden="true"></i><sup className="w3-border w3-red w3-round-xlarge">{nO}</sup></button>)
}
return <button style={{float:"right"}} onClick={props.onClick}  
className='w3-btn currency-button selected'>BACK</button>
};
import { getLocalUser } from '../utilities/auth.js';
export const App = (props) => {
//const [checkout,setCheckout]=useState(false)
let inventory=useSelector(state=>state.inventory.initialInventory);
const searchResults=useSelector(state=>state.inventory.searchInventory);
//const onCheckout=()=>setCheckout(true);
const dispatch=useDispatch();
const searchTerm=useSelector(state=>state.search.searchTerm);
//const nO=useSelector(s=>s.cart.itemsCount)
const user=useSelector(s=>s.user)
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
  const menu_items=[['/static/admin/index.html','Home'],
  ["/static/admin/books","Books"],
["/static/admin/orders","Orders"],
['/static/admin/books/edit/new','Add Book'],
['/static/login/index.html','Login']
];
  return (
  <Router>
    <Nav menu={menu_items}
    onLogout={onLogout } logout_path="/static/login/index.html" 
    user={userNav} />
  <Routes>
  <Route path='/static/admin/index.html' element={<Inventory  
     dispatch={dispatch}
     inventory={inventory}
     searchTerm={searchTerm}
  />} />
  <Route  path='/static/admin/books'>
  
  <Route index element={
  <div className='w3-container'>
  <div className='w3-container'>
  <CurrencyFilter
    dispatch={dispatch}
  > { searchTerm &&
    <BackButton onClick={()=>{dispatch(clearSearchTerm())}} />
   
    }
    
    </CurrencyFilter></div>
    <SearchTerm  dispatch={dispatch} />
  <Inventory  
     dispatch={dispatch}
     inventory={inventory}
     searchTerm={searchTerm}
  /></div>} />
  <Route path='edit/:bookId' element={<EditView   />}  />
  </Route>
 
  <Route path='/static/admin/orders' >
  <Route index element={<OrdersList   />}  />
  <Route path='detail/:orderId' element={<OrderDetail  />} />
  </Route>

  </Routes>
</Router>);


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
};
