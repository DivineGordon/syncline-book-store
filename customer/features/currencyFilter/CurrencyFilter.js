import React, { Children } from 'react';
import {useSelector} from 'react-redux';
import { currenciesData } from '../../../data.js';
import { setCurrency } from './currencyFilterSlice.js';

export const CurrencyFilter = ({  dispatch }) => {
  const currencyFilter=useSelector(state=>state.currencyFilter);
  const onClickHandler = (currency) => {
    dispatch(setCurrency(currency));
  };
 //id="currency-filters-container"
  return (<div className='w3-container w3-cell w3-mobile'>
    
   <div className='w3-margin'>
  
      <h3>Choose a currency</h3>
      {currenciesData.map(createCurrencyButton)}
      </div>
   
    </div>
  );

  function createCurrencyButton(currency) {
    return (
      <button
        className={`currency-button ${
          currencyFilter === currency && 'selected'
        } w3-cell`}
        key={currency}
        onClick={() => onClickHandler(currency)}
      >
        {currency}
      </button>
    );
  }
};
