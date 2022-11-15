import * as React from 'react';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { OrdersList } from '../features/orders/Orders';
import { OrderDetail } from '../features/orders/OrderDetail';
import { Nav } from '../Navigation.js';
import { getLocalUser } from '../utilities/auth.js';
import { changeUser } from '../features/user/userSlice'
import { CheckOut } 
from '../features/checkout/Checkout';
import { useAppSelector } from './hooks';
import { Catalogue } 
from '../features/catalogue/Catalogue';
export const BackButton = (props:any) => {
  const navigate = useNavigate()
  const { cartButton, nO, page, alone } = props;
  const onClick = () => { navigate(page) }
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


export const App = () => {

  const appMessage = useAppSelector(s => s.app.message)
  const appMessageCount = useAppSelector(s => s.app.count)
  const user = useAppSelector(s => s.user)

  //const searchResults = useAppSelector(state => state.inventory.searchInventory);

  const dispatch = useDispatch();



  useEffect(() => {
    if (appMessage === '') return;
    var chat:any = document.getElementById("chat-snackbar");
    chat.MaterialSnackbar.showSnackbar({ message: appMessage, timeout: 4e3 })

  },
    [appMessage, appMessageCount])
  useEffect(() => {
    if (user) return;
    dispatch(changeUser(getLocalUser()))

  }, [user])
  let userNav = null;
  if (user) userNav = { ...user, displayName: user.username, uid: user.id };
  const onLogout = () => {
    window.localStorage.removeItem('user')
  }
  const menu_items = [['/static/index.html', 'Home'], ["/static/books/catalogue", "Books"],
  ["/static/orders", "Orders"], ['/static/books/checkout', 'Cart'],
  ['/static/login/index.html', 'Login']];
  return (
    <Router>
      <Nav menu={menu_items}
        onLogout={onLogout}
        logout_path="/static/login/index.html"
        user={userNav} />
      <Routes>
        <Route path='/static/orders'>
          <Route index element={<OrdersList />} />
          <Route path='detail/:orderId'
            element={<OrderDetail />} />
        </Route>
        <Route path='/static/books/checkout'
          element={<CheckOut />} />

        <Route path='/static/books/catalogue'
          element={<Catalogue />} />
        <Route path='/static/index.html'
          element={<Catalogue />} />
      </Routes>
    </Router>
  );



};
