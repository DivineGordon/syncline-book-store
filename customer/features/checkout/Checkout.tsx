import * as React from 'react'
import { CurrencyFilter } from "../currencyFilter/CurrencyFilter";
import { BackButton } from "../../app/App";
import { useAppDispatch } from '../../app/hooks';
import { Cart } from '../cart/Cart';
export const CheckOut=()=>{
  const dispatch=useAppDispatch()
   return  <div className="w3-main" style={{marginLeft:250}}>
    <div className='w3-cell-row w3-margin'>
    <CurrencyFilter dispatch={dispatch} />
    <div className='w3-container  w3-cell w3-cell-middle w3-mobile'>
   <BackButton page={'/static/books/catalogue'} />
      </div>  </div>
 <Cart summary={false}  />
    </div>
    }