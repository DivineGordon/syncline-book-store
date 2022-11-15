import React, { useEffect, useState } from 'react';
import {
  calculatePrice,
  calculateTotal,
  getCurrencySymbol,
} from '../../utilities/utilities.js';
import {useSelector,useDispatch} from 'react-redux';

import {changeItemQuantity,removeItem, 
  saveOrder} from './cartSlice';
import { MessageBox2, SpinnerLoader } from '../../General.js';
import { useNavigate } from 'react-router-dom';
import { systemMessage } 
from '../../app/appSlice';
import { NonIdealState } from '@blueprintjs/core';

export const Cart = (props) => {
  const { summary} = props;
  const apiLoading=useSelector(s=>s.cart.apiLoading)
  const navigate=useNavigate()
  const dispatch=useDispatch();
  const user=useSelector(s=>s.user)
  const cart =useSelector(state=>state.cart.cart)
  const currencyFilter =useSelector(state=>state.currencyFilter)
  const [msgbox,setMsgBox]=useState({display:'hide',state:'idle'})
  useEffect(()=>{
    if(apiLoading.state!=='fulfilled'||apiLoading.state!=='ff')return;
    setMsgBox(s=>({display:'show',message:"successfully purchased books"}))
   
  },[apiLoading.id,apiLoading.state])
const onCheckout=()=>{navigate('/static/books/checkout')}
if(apiLoading.state==='pending')return <SpinnerLoader  state={apiLoading.state} />;
  // Use the cart and currencyFilter slices to render their data.
 
  const cartKeys=Object.keys(cart);
  //const cartElements = new Array(cartKeys.length);

  const total =cartKeys.length && calculateTotal(cart, currencyFilter);
const sendOrder=(e)=>{
e.stopPropagation();
if(!user){
  const message='you need to login to make an order'
  return dispatch(systemMessage(message))
}
const cartData={cart:{...cart},total_amount:total,user:user.id}
setMsgBox(s=>({display:'hide',message:null}))
dispatch(saveOrder(cartData))

}

 const msgButton=<button  onClick={sendOrder}  
 className='w3-btn w3-blue'>Pay</button>


  if(summary){
 
    const products=cartKeys.slice(0,3).map(v=>{
     return cart[v].title+"("+cart[v].p_qty+")"
    });
	
  return <div className='total-sticky' style={{backgroundColor:"#f2f2f2",
//position:"fixed",
bottom:"0%",
width:"100%"}}>
  {cartKeys.length!==0 && 
     <p>Products: {cartKeys.length}{' '}<a onClick={onCheckout} href="#">{"("+products.join()+")"}
   <i className="fa fa-external-link" aria-hidden="true"></i></a></p>}
<div className='w3-row-padding'>
  <div className='w3-col s6'>
<h3 className="total">
  Total{' '}
</h3></div><div className='w3-col s6'>
<h3>
<span className="total total-value">
    {getCurrencySymbol(currencyFilter)}{total}
  </span></h3></div>
</div></div>
  }

  if(!cartKeys.length){
    return <NonIdealState  className='w3-center'
    icon='shopping-cart'
    title={<span>cart is empty</span>}
    />
  }
const onRemove=(e)=>{dispatch(removeItem(e.target.name))};
  const onChangeHandler = (_id, input) => {
    // If the user enters a bad value...
    if (input === '') {
      return;
    }
    // Otherwise, convert the input into a number and pass it along as the newQuantity.
    const newQuantity = parseInt(input);

    // Dispatch an action to change the quantity of the given name and quantity.
dispatch(changeItemQuantity({_id,newQuantity}))
  };
  let cartElements=cartKeys.map(
    (key)=>{
      return (<CartItem key={key} onChange={onChangeHandler}  
	  onRemove={onRemove} 
        currency={currencyFilter} 
        item={cart[key]}  />);
    }
  )

const payForCart=(e)=>{
e.stopPropagation();
setMsgBox(s=>({...s,component:null,display:'show',message:`Total Amount ${
  getCurrencySymbol(currencyFilter)+' '+total}`,button:msgButton}))
}

  return (
   
<div className="w3-container">
<MessageBox2   state={msgbox.state} display={msgbox.display}   
component={msgbox.component}
message={msgbox.message}
buttons={msgbox.button}
change={setMsgBox}
/>
<ul className="w3-row">{
cartElements.length?cartElements:<h2>No items in cart</h2>}</ul>
{cartElements.length!==0 && <div className='w3-bar'>
  <button onClick={payForCart} className='w3-bar-item w3-btn currency-button selected w3-right'><b>
    Pay</b></button>
</div>}
{ cartKeys.length!==0 &&  <div className='total-sticky' style={{backgroundColor:"#f2f2f2",
//position:"fixed",
bottom:"0%",
width:"100%"}}>
<div className='w3-row-padding'>
  <div className='w3-col s6'>
<h3 className="total">
  Total{' '}
</h3></div><div className='w3-col s6'>
<h3>
<span className="total total-value">
    {getCurrencySymbol(currencyFilter)}{total}
  </span></h3></div>
</div></div>}
</div>
  );

  
};

function CartItem(props) {
  const {item,onChange,currency,onRemove}=props;
  let {quantity,img,amount,price,title:name,_id,unit_price,p_qty} =item;
 
  if (quantity === 0) {
    return;
  }
  if(!img){
    img='/resources/images/open_book.jpg'
  }
  
 
  const subTotal=calculatePrice(amount,currency).toFixed(2);
  price=calculatePrice(price,currency).toFixed(2);
  return (
 

  <li key={_id} className='w3-container w3-margin-bottom w3-border w3-col m8 item items-cart'>
     
      <div className='w3-row-padding'>
      <div className='w3-container  w3-third' >
      <img src={img} alt={''}  width="100%" />
      </div>
      <div className='w3-container w3-twothird w3-right-align'>
<p><button className="w3-btn w3-border w3-round"  name={_id} onClick={onRemove} title="remove item">X</button></p>
      <p>{name}{" ("+unit_price+")"}</p>
      <p>Stock quantity: {"( "+quantity+" )"}</p>
       <p><input  type="number"  
        value={p_qty}
        onChange={(e) => { 
          e.stopPropagation();
          onChange(_id, e.target.value);  }}
          min="1" max="100" /></p>
        <p>{subTotal}</p>
  </div>
          </div>
    </li>
  )
  
}