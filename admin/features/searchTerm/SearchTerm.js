import React,{useState} from 'react';
import { setSearchTerm, clearSearchTerm } from './searchTermSlice.js';

/*
const searchIconUrl =
  'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/search.svg';*/
const clearIconUrl =
  'https://static-assets.codecademy.com/Courses/Learn-Redux/Recipes-App/icons/clear.svg';
// <span style={{backgroundColor:"#f2f2f2"}}> <img id="search-icon" alt="" src={searchIconUrl} /></span>
export const SearchTerm = (props) => {
  const { dispatch } = props;
  const [searchTerm,setLocalTerm]=useState("");
  
  const onSearchTermChangeHandler = (e) => {
   setLocalTerm(e.target.value)
  };
  const onSubmit=(e)=>{
    e.preventDefault();
    const userInput= document.forms.searchForm.search.value;
   
    dispatch(setSearchTerm(userInput));
  }

  const onClearSearchTermHandler = () => {
    //dispatch(clearSearchTerm());
    setLocalTerm("")
  };

  return (
   // <div id="search-container">
   <div className="w3-container w3-center">
      <div className="w3-container w3-col m6">
      <form name="searchForm" onSubmit={onSubmit} className="w3-container w3-row-padding">
        <div className="w3-container w3-twothird w3-margin-bottom" style={{position:"relative"}}>
      <input
      name='search' 
        id="search"
        type="text"
        value={searchTerm}
        required={true}
        onChange={onSearchTermChangeHandler}
        placeholder="Search products"
      />
      {searchTerm.length > 0 && (
        <button
          onClick={onClearSearchTermHandler}
          type="button"
          id="search-clear-button"
        >
          <img src={clearIconUrl} alt="" />
        </button>
      )}</div>
      <div className='w3-third w3-margin-bottom'><button type="submit"   
      className='w3-btn w3-round currency-button selected' >Search
      </button>
     </div> </form>
    </div></div>
  );
};
