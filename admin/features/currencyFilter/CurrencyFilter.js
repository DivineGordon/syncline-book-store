import React, { Children } from 'react';
import {useSelector} from 'react-redux';
import { currenciesData } from '../../../data.js';
import { setCurrency } from './currencyFilterSlice.js';

export const CurrencyFilter = ({  dispatch,children }) => {
  const currencyFilter=useSelector(state=>state.currencyFilter);
  const onClickHandler = (currency) => {
    dispatch(setCurrency(currency));
  };

  return (<div className='w3-container'>
    <div id="currency-filters-container">
      <h3>Choose a currency</h3>
      {currenciesData.map(createCurrencyButton)}
      {children}
    </div>
    </div>
  );

  function createCurrencyButton(currency) {
    return (
      <button
        className={`currency-button ${
          currencyFilter === currency && 'selected'
        }`}
        key={currency}
        onClick={() => onClickHandler(currency)}
      >
        {currency}
      </button>
    );
  }
};
