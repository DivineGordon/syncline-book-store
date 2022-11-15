import React,{useState,useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { BrowserRouter as Router,Routes,Route, Navigate, useNavigate } from 'react-router-dom';
import {OrdersList } from '../features/orders/Orders'
import {EditView} from '../features/productView/SingleProduct'
import { OrderDetail } from '../features/orders/OrderDetail';
import { Nav } from '../Navigation.js';
import { changeUser } from '../features/user/userSlice.js';
import {Catalogue} from '../features/catalogue/Catalogue'
import { getLocalUser } from '../utilities/auth.js';
export const BackButton = (props) => {
  const navigate =useNavigate()
  const onClick1 = () => { navigate(page) }
  let { cartButton,onClick=onClick1, nO, page, alone } = props;
  
  let button;
  if (cartButton) {
    button = (<button style={
      { position: "sticky", 
      //top: "10%", 
      //float: "right",
     // right: "5%" 
    }
    } onClick={onClick}
  className='w3-btn w3-xlarge w3-round-xxlarge w3-border w3-margin-right w3-cell'>
      <i className="fa fa-cart-plus" aria-hidden="true">
      </i><sup className="w3-border w3-red w3-round-xlarge">{nO}</sup></button>)
  }
  else button = <button 
 
  onClick={onClick}
    className='w3-btn currency-button selected w3-margin-right'>BACK</button>


  if (alone) return <div className='w3-container'>
    <div id="currency-filters-container">
      {button}
    </div></div>;
  return button
};


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
  
  return (
  <Router>
    <Nav menu={menu_items}
    onLogout={onLogout } logout_path="/static/login/index.html" 
    user={userNav} />
  <Routes>
  <Route path='/static/admin/index.html' element={
 <Catalogue  />} />
  <Route  path='/static/admin/books'>
  
  <Route index element={<Catalogue />
  
  } />
  <Route path='edit/:bookId' element={<EditView   />}  />
  </Route>
 
  <Route path='/static/admin/orders' >
  <Route index element={<OrdersList   />}  />
  <Route path='detail/:orderId' element={<OrderDetail  />} />
  </Route>

  </Routes>
</Router>);

};
const menu_items=[['/static/admin/index.html','Home'],
  ["/static/admin/books","Books"],
["/static/admin/orders","Orders"],
['/static/admin/books/edit/new','Add Book'],
['/static/login/index.html','Login']
];