import React, { useEffect } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getRDXOrders,  getOrdersThunk } from './ordersSlice'
import { BackButton } from '../../app/App'
import { systemMessage } from '../../app/appSlice'
export const OrdersList=(props)=>{
   const {children}=props;
   const orders = useSelector(getRDXOrders);
   const user=useSelector(s=>s.user)
   const fetchCommand=useSelector(s=>s.orders.fetchCommand)
   const navigate=useNavigate()
   const dispatch=useDispatch()
useEffect(()=>{
   if(fetchCommand!=='fetch')return;
   if(!user){
      const message='you need to login to see orders'
      dispatch(systemMessage(message))
   return;
}
dispatch(getOrdersThunk(user.id))
},[fetchCommand])
const onClickItem=(e)=>{
e.stopPropagation();
if(e.target.tagName.toLowerCase()!== 'button')return;
const orderId=e.target.dataset.orderid;

navigate('./detail/'+orderId)
}
return (<>
<BackButton alone={true} page={-1} />
<div  className='w3-main' style={{marginLeft:250}}>
<div onClick={onClickItem }  className='w3-col m7 w3-container'>
  
         {orders.length!==0? orders.map((v,i)=>(<OrderLineItem order={v} key={i} />)):<h2>No results found</h2>}
</div>
</div></>)
}
const OrderLineItem=({order})=>{
  return  <div  className='w3-card-2 w3-padding'>
   <header className='w3-cell-row w3-container w3-light-grey'>
      <p className='w3-cell'>Order Id: {order._id}</p>
       <p  className='w3-cell'> <span className='w3-right'>Date: {
      (new Date(order.date)).toLocaleString()}</span></p></header>
      <p>Products: {}</p>
      <p>Total Amount: {order.total_amount}</p>
      <div className='w3-container'>
      <button data-orderid={order._id} 
      className="w3-button w3-block w3-blue">+ Details</button>
      </div>
   </div>
}