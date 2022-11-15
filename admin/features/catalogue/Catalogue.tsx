import * as React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CurrencyFilter } from '../currencyFilter/CurrencyFilter'
import { BackButton } from '../../app/App'
//import { Cart } from '../cart/Cart'
import { clearSearchTerm } 
from '../searchTerm/searchTermSlice2'
import { SearchTerm } from '../searchTerm/SearchTerm2'
import { Inventory } from '../inventory/Inventory'

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
{ searchTerm &&
  <BackButton alone={true} onClick={()=>{
    dispatch(clearSearchTerm())
  }
  } />
 }
    
    </div>
  </div>


<SearchTerm  dispatch={dispatch} />
<Inventory
  dispatch={dispatch}
  searchTerm={searchTerm}
/>
</div>

}
