import React, { useEffect,useState } from 'react';

import {
  calculatePrice,
  getCurrencySymbol,
} from '../../utilities/utilities.js';
import { addItem } from '../cart/cartSlice.js';
import { loadData } from './inventorySlice';
import {useDispatch, useSelector} from 'react-redux';
import { MessageBox2 } from '../../General.js';
import { Navigate, useNavigate } from 'react-router-dom';
import { deleteBookThunk } from './inventorySlice';
const emptyArray=[];
export const Inventory = ({ searchTerm, dispatch }) => {
  const inventory=useSelector(s=>s.inventory.initialInventory)
  const [itemsInCart,setItemsIncart]=useState(emptyArray); 
  const currencyFilter=useSelector(state=>state.currencyFilter);
  const onMount = () => {
    if(inventory  && inventory.length!==0)return;
    dispatch(loadData());
  };
  useEffect(onMount, []);

  const onClickHandler = (inventoryItem) => {
    dispatch(addItem(inventoryItem));
    setItemsIncart(state=>[...state,inventoryItem.id])
  };

  if(searchTerm && !inventory){
    return <p> Sorry, no products found... </p>;
  }
  if (inventory.length === 0) {
    return <p> Sorry, no products are currently available... </p>;
  }

  

  
      return   (<div className='w3-container'>
   <ul id="inventory-container">{
    inventory.map(p=>{
      return (<InventoryItem currencyFilter={currencyFilter} 
        //addedToCart={itemsInCart.some(id=>id===p.id)}
         key={p._id}  inventoryItem={p} />)})}
        </ul></div>);

  
};
function InventoryItem(props) {
  const dispatch=useDispatch()
 const navigate= useNavigate()
  const [msgbox,setMsgBox]=useState({display:'hide'})
  const {inventoryItem,currencyFilter}=props;
  
  const onClickDelete=(e)=>{
    e.stopPropagation()
setMsgBox(s=>({...s,display:'show'}))
  }
  const DeleteItem=(e)=>{
    e.stopPropagation()
    dispatch(deleteBookThunk(inventoryItem._id))
    setMsgBox(s=>({...s,display:'hide'}))
  }
  let {unit_price:price,title:name, img,picture } = inventoryItem;
  let delButton, delMessage;
  if(msgbox.display==='show'){
 delMessage=`Do you want to delete ${name}`
  delButton=<button  onClick={DeleteItem}
  className='w3-btn w3-dark-grey'>Delete</button>
}
  price=Number(price);
  if(!picture){
    img="/resources/images/open_book.jpg"
  }
  else {
    img='/api/images/'+picture
  }
  const displayPrice = calculatePrice(price, currencyFilter);
  //const addedToCart=useSelector(s=>(!!s.cart.cart[na]))
  const onEditClick=(e)=>{
    e.stopPropagation();
    navigate(`/static/admin/books/edit/${inventoryItem._id}`)
  }
  return (
    <li className="item">
    <MessageBox2 display={msgbox.display} message={delMessage} 
    buttons={delButton}
    change={setMsgBox}
    />
      <img src={img}   alt={''} />
      <h3 title={name.length>20 ? name:undefined}>{
      name.length<=20?name:name.substring(0,18)+'...' }</h3>
      <h3 className="price">
        {getCurrencySymbol(currencyFilter)}
        {displayPrice.toFixed(2)} {currencyFilter}
      </h3>
      <button
        onClick={onEditClick}
        className="add-to-cart-button"
      >
     Edit
      </button>
      <button
        onClick={ onClickDelete}
        className="add-to-cart-button"
      >
       Delete
      </button>
    </li>
  );
}