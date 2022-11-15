import * as React from 'react'
 import { useEffect,useState } from 'react';

import {
  calculatePrice,
  getCurrencySymbol,
} from '../../utilities/utilities.js';
import { addItem } from '../cart/cartSlice';
import { loadData } from './inventorySlice';
import {useDispatch, useSelector} from 'react-redux';
import { NonIdealState } from '@blueprintjs/core';
import { useAppSelector } from '../../app/hooks';

const emptyArray:any[]=[];
export const Inventory = ({ searchTerm, dispatch 
}:{searchTerm:string,dispatch:any}) => {
  const inventory=useAppSelector(s=>s.inventory.initialInventory)
  const [itemsInCart,setItemsIncart]=useState<string[]>(emptyArray); 
  const currencyFilter=useAppSelector(state=>state.currencyFilter);
  const onMount = () => {
    if(inventory  && inventory.length!==0)return;
    dispatch(loadData());
  };
  
  useEffect(onMount, []);

  const onClickHandler = (inventoryItem:any) => {
    dispatch(addItem(inventoryItem));
    setItemsIncart((state:string[])=>([...state,inventoryItem._id]))
  };

  if(searchTerm && !inventory.length){
    const description= <div>
      <p>{ `Sorry, no products found ${searchTerm} ... `}</p>
      <br />
      <p>Try searching for other products</p>
      </div>
       return  <NonIdealState className='w3-center' 
       icon="search" 
       description={description} 
       title={<p>No products available</p>}
       />
  
  }
  if (!inventory.length ) {
    const description= <div>
   <p> Sorry, no products are currently available... </p>;
    </div>
return    <NonIdealState 
        icon="shopping-cart" 
       description={description} 
       title={<p>No products available</p>}
       />
 
  }

  

  
      return   (<div className='w3-container'>
   <ul id="inventory-container">{
    inventory.map((p:any)=>{
      return (<InventoryItem currencyFilter={currencyFilter} 
        addedToCart={itemsInCart.some(id=>id===p.id)}
        onClickHandler={onClickHandler} key={p.title}  inventoryItem={p} />)})}
        </ul></div>);

  
};
function InventoryItem(props:any) {
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
  const addedToCart=useAppSelector((s:any)=>(!!s.cart.cart[_id]))
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