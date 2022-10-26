import React ,{useEffect}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {getOrdersMongo, getRDXOrders } from './ordersSlice'
export const OrdersList=()=>{
   const fetchCommand=useSelector(s=>s.orders.fetchCommand)
   const orders = useSelector(getRDXOrders)
   const navigate=useNavigate()
   const dispatch=useDispatch()
   useEffect(()=>{
      if(fetchCommand!=='fetch')return;
   dispatch(getOrdersMongo())
   },[fetchCommand])
const onClickItem=(e)=>{
e.stopPropagation();
if(e.target.tagName.toLowerCase() !=='button')return;
const orderId=e.target.dataset.orderid;

navigate('./detail/'+orderId)
}
const goBack=(e)=>{
   e.stopPropagation()
   navigate(-1)
}
return <>
<div className='w3-container w3-margin'>
<button style={{float:"right"}} onClick={goBack}  
className='w3-btn currency-button selected'>BACK</button></div>

<div onClick={onClickItem } style={{marginLeft:170}} className='w3-col m7 w3-container'>
         {orders.length!==0? orders.map((v,i)=>(<OrderLineItem order={v} key={i} />)):<h2>No results found</h2>}
</div>
</>
}
const OrderLineItem=({order})=>{
  return  <div  className='w3-card w3-margin w3-border w3-padding'>
      <p>Order Id: {order._id}  <span className='w3-right'>Date: {order.date}</span></p>
      <p>Products: {}</p>
      <p>Total Amount: {order.total_amount}</p>
      <div className='w3-center'>
      <button data-orderid={order._id} 
      className="w3-btn w3-block w3-blue">+ Details</button></div>
   </div>
}