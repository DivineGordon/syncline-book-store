import React, { useState } from 'react';
import {
  calculatePrice,
  calculateTotal,
  getCurrencySymbol,
} from '../../utilities/utilities.js';
import {useSelector,useDispatch} from 'react-redux';
import { BackButton } from '../../app/App';
//import {changeItemQuantity,removeItem} from './cartSlice.js';
//import { MessageBox2 } from '../../General.js';
import { useParams } from 'react-router-dom';
import {getRDXOrders } from './ordersSlice'
export const OrderDetail = (props) => {
    const {orderId}=useParams()
  const { onCheckout,children} = props;
  const dispatch=useDispatch();
  const orders=useSelector(getRDXOrders)
  const order=orders.find(v=>v._id===orderId)
  //const cart =useSelector(state=>state.cart.cart)
  const currencyFilter =useSelector(state=>state.currencyFilter)
  const [msgbox,setMsgBox]=useState({display:'hide',state:'idle'})
  // Use the cart and currencyFilter slices to render their data.
  
 const {books}=order;
  //const cartElements = new Array(cartKeys.length);
  const total =books.length && calculateTotal(books, currencyFilter);



  const cartElements=books.map(
    (bookItem,key)=>{
      return (<CartItem key={key}  
	  
        currency={currencyFilter} 
        name={key}  item={bookItem}  />);
    }
  )

  return (
    
 <>
  <BackButton alone={true} page={-1} />
<div className="w3-container">
<div className='w3-container w3-padding'>
  <span className='w3-left'>Order ID: {order._id}</span>
  <span className='w3-right'>Date: {new Date(order.date).toString()}</span>
</div>

<ul className="w3-row">{cartElements}</ul>
{/*cartElements.length!==0 && <div className='w3-bar'>
  <button onClick={payForCart} className='w3-bar-item w3-btn w3-right'>Pay</button>
</div>*/}
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
</> );

  
};

function CartItem(props) {
  const {name,item,currency}=props;
  let {p_qty,img,amount,unit_price:price} =item;
 
  if(!img){
    img="/resources/images/open_book.jpg"
  }
 
  const subTotal=calculatePrice(amount,currency).toFixed(2);
  price=calculatePrice(price,currency).toFixed(2);
  return (
  

  <li  className='w3-container w3-margin-bottom w3-border w3-col m8 item items-cart'>
     
      <div className='w3-row-padding'>
      <div className='w3-container  w3-third' >
      <img src={img} alt={''}  width="100%" />
      </div>
      <div className='w3-container w3-twothird w3-right-align'>
      { item.book && <>
      <p>{item.book.title}{" ("+price+")"}</p>
        <p>Current Stock Qty :{item.book.quantity} </p></>}
       <p>Order Qty: {p_qty}</p>
        <p>{subTotal}</p>
  </div>
          </div>
    </li>
  )
  
}