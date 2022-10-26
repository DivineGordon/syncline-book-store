import React, { useState } from 'react';
import {
  calculatePrice,
  calculateTotal,
  getCurrencySymbol,
} from '../../utilities/utilities.js';
import {useSelector,useDispatch} from 'react-redux';

import {changeItemQuantity,removeItem} from './cartSlice.js';
import { MessageBox2 } from '../../../General.js';

export const Cart = (props) => {
  const { summary,onCheckout} = props;
  const dispatch=useDispatch();
  const cart =useSelector(state=>state.cart.cart)
  const currencyFilter =useSelector(state=>state.currencyFilter)
  const [msgbox,setMsgBox]=useState({display:'hide',state:'idle'})
  // Use the cart and currencyFilter slices to render their data.
 const cartKeys=Object.keys(cart);
  //const cartElements = new Array(cartKeys.length);
  const total =cartKeys.length && calculateTotal(cart, currencyFilter);
const pay=(e)=>{
e.stopPropagation();
setMsgBox(s=>({display:'show',message:"successfully purchased books"}))
}

 const msgButton=<button  onClick={pay}  className='w3-btn w3-blue'></button>


  if(summary){
 
    const products=cartKeys.slice(0,3).map(v=>{
     return v+"("+cart[v].quantity+")"
    });
	/*
    return (<div id="cart-container">  
   {cartKeys.length!==0 && 
     <p>Products: {cartKeys.length}<a onClick={onCheckout} href="#">{"("+products.join()+")"}
   <i className="fa fa-external-link" aria-hidden="true"></i></a></p>}
   <h3 className="total">Total{' '}
      <span className="total-value">
        {getCurrencySymbol(currencyFilter)}{total}
      </span>
    </h3>
  </div>)*/
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
const onRemove=(e)=>{dispatch(removeItem(e.target.name))};
  const onChangeHandler = (name, input) => {
    // If the user enters a bad value...
    if (input === '') {
      return;
    }
    // Otherwise, convert the input into a number and pass it along as the newQuantity.
    const newQuantity = parseInt(input);

    // Dispatch an action to change the quantity of the given name and quantity.
dispatch(changeItemQuantity(name,newQuantity))
  };
  const cartElements=cartKeys.map(
    (key)=>{
      return (<CartItem key={key} onChange={onChangeHandler}  
	  onRemove={onRemove} 
        currency={currencyFilter} 
        name={key}  item={cart[key]}  />);
    }
  )
const payForCart=(e)=>{
e.stopPropagation();
setMsgBox(s=>({...s,component:null,display:'show',message:`Total Amount ${
  getCurrencySymbol(currencyFilter)+' '+total}`,button:msgButton}))
}
  return (
    /*
    <div id="cart-container">
      <ul id="cart-items">{cartElements}</ul>
      <h3 className="total total-full">
        Total{' '}
        <span className="total-value">
          {getCurrencySymbol(currencyFilter)}{total} {currencyFilter}
        </span>
      </h3>
    </div>
  */

<div className="w3-container">
<MessageBox2   state={msgbox.state} display={msgbox.display}   
component={msgbox.component}
message={msgbox.message}
buttons={msgbox.button}
change={setMsgBox}
/>
<ul className="w3-row">{cartElements}</ul>
{cartElements.length!==0 && <div className='w3-bar'>
  <button onClick={payForCart} className='w3-bar-item w3-btn w3-right'>Pay</button>
</div>}
<div className='total-sticky' style={{backgroundColor:"#f2f2f2",
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
</div></div>
</div>
  );

  
};

function CartItem(props) {
  const {name,item,onChange,currency,onRemove}=props;
  let {quantity,img,amount,price} =item;
 
  if (quantity === 0) {
    return;
  }
  
 
  const subTotal=calculatePrice(amount,currency).toFixed(2);
  price=calculatePrice(price,currency).toFixed(2);
  return (
  /*(
    <li key={name}>
      <p>{name}</p>
      <select
        className="item-quantity"
        value={item.quantity}
        onChange={(e) => {
          onInputChangeHandler(name, e.target.value);
        }}
      >
        {[...Array(100).keys()].map((_, index) => (
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </select>
    </li>
  );
  <li key={name} className='cart-card'>
      <p>{name}</p>
      <div className="item">
      <img src={img} alt={''} />
      </div>
        <input  className="item-quantity" type="number"  
        value={quantity}
        onChange={(e) => { onChange(name, e.target.value);  }}
          min="1" max="100" />
    </li>
  */

  <li key={name} className='w3-container w3-margin-bottom w3-border w3-col m8 item items-cart'>
     
      <div className='w3-row-padding'>
      <div className='w3-container  w3-third' >
      <img src={img} alt={''}  width="100%" />
      </div>
      <div className='w3-container w3-twothird w3-right-align'>
<p><button className="w3-btn w3-border w3-round"  name={name} onClick={onRemove} title="remove item">X</button></p>
      <p>{name}{" ("+price+")"}</p>
       <p><input  type="number"  
        value={quantity}
        onChange={(e) => { onChange(name, e.target.value);  }}
          min="1" max="100" /></p>
        <p>{subTotal}</p>
  </div>
          </div>
    </li>
  )
  
}