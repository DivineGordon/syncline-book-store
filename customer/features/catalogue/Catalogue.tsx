import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CurrencyFilter } from '../currencyFilter/CurrencyFilter'
import { BackButton } from '../../app/App'
import { Cart } from '../cart/Cart'
import { clearSearchTerm } from '../searchTerm/searchTermSlice'
import { SearchTerm } from '../searchTerm/SearchTerm'
import { Inventory } from '../inventory/Inventory'
import { useNavigate } from 'react-router-dom'
export const Catalogue=()=>{
        const dispatch=useAppDispatch()
        const searchTerm=useAppSelector(state=>state.search.searchTerm);
        const nO=useAppSelector(s=>s.cart.itemsCount)
return <div className='w3-container'>
<div className='w3-cell-row'>
<CurrencyFilter
  dispatch={dispatch}
/> 
<div className='w3-container w3-cell w3-cell-middle w3-margin w3-mobile'>
{ searchTerm ?
  <BackButton onClick={()=>{dispatch(clearSearchTerm())}} />:
  <BackButton nO={nO} page={'/static/books/checkout'} cartButton={true}/>
  }
    <OrdersButton />
    </div>
  </div>


<SearchTerm  dispatch={dispatch} />
<Inventory
  dispatch={dispatch}
  searchTerm={searchTerm}
/>
<Cart summary={true} />

</div>

}
const OrdersButton=()=>{
    const navigate=useNavigate()
    const onClick=()=>{navigate('/static/orders')}
    return <button style={{float:"right"}} onClick={onClick}  
    className='w3-btn w3-xlarge w3-round-xxlarge w3-border w3-margin-right w3-cell'>Orders</button>
  }