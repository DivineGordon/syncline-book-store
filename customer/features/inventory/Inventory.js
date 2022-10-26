import React, { useEffect,useState } from 'react';

import {
  calculatePrice,
  getCurrencySymbol,
} from '../../utilities/utilities.js';
import { addItem } from '../cart/cartSlice.js';
import { loadData } from './inventorySlice';
import {useDispatch, useSelector} from 'react-redux';

const emptyArray=[];
export const Inventory = ({ searchTerm, dispatch }) => {
  const inventory=useSelector(s=>s.inventory.initialInventory)
  const [itemsInCart,setItemsIncart]=useState(emptyArray); 
  const currencyFilter=useSelector(state=>state.currencyFilter);
  const onMount = () => {
    if(inventory  && inventory.length!==0)return;
    dispatch(loadData());
  };
  //useEffect(onMount, [inventory]);
  useEffect(onMount, []);

  const onClickHandler = (inventoryItem) => {
    dispatch(addItem(inventoryItem));
    setItemsIncart(state=>[...state,inventoryItem._id])
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
        addedToCart={itemsInCart.some(id=>id===p.id)}
        onClickHandler={onClickHandler} key={p.title}  inventoryItem={p} />)})}
        </ul></div>);

  
};
function InventoryItem(props) {
  const {inventoryItem,onClickHandler,currencyFilter}=props;
  let {unit_price:price,title:name, img ,picture,_id} = inventoryItem;
  price=Number(price);
  
  if(!picture){
    img="/resources/images/open_book.jpg"
  }
  else {
    img='/api/images/'+picture
  }
  const displayPrice = calculatePrice(price, currencyFilter);
  const addedToCart=useSelector(s=>(!!s.cart.cart[_id]))
  return (
    <li className="item">
      <img src={img}   alt={''} />
      <h3 title={name.length>20 ? name:undefined} >{name.length<=20?name:name.substring(0,18)+'...'}</h3>
      <h3 className="price">
        {getCurrencySymbol(currencyFilter)}
        {displayPrice.toFixed(2)} {currencyFilter}
      </h3>
      <button
        onClick={() => onClickHandler(inventoryItem)}
        className="add-to-cart-button"
      >
       {addedToCart?"Added":"Add to Cart"}
      </button>
    </li>
  );
}