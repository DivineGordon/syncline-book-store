import React,{useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import { NavLink, useLocation } from 'react-router-dom';
function w3_open(e) {
  document.getElementById(e).style.display = "block";
}

function w3_close(e) {
  document.getElementById(e).style.display = "none";
}

export const Nav=({menu,user,logout_path,onLogout})=>{
  const pathname= useLocation().pathname;
  const create_buttons=(main)=>{
    return menu.map(
      ([route,title],i)=>{
        let active=false;
        if(!user && (title==='Playlists' || title==='Friends'))return null;
        if(main){
          if(title.toLowerCase() ==='login' && user  && user.uid){
            return null
           }
           if(title.toLowerCase() ==='login' && (!user  || !user.uid)){
            return   <li className="w3-bar-item w3-mobile" key={i} >  
            <a href={route}  className="w3-bar-item  w3-button">
              {title}</a></li>
             }
         
        return   <li className="w3-bar-item w3-mobile" key={i} >
<NavLink to={route}  className="w3-bar-item  w3-button tablink">
          {title}</NavLink></li>
        }
        if(title.toLowerCase() ==='login' && user  && user.uid){
         return null
        }
        if(title.toLowerCase() ==='login' && (!user  || !user.uid)){
        return  <a href={route} key={i} className="w3-bar-item  w3-button">
          {title}</a>
         }

      return  <NavLink to={route} key={i} className="w3-bar-item  w3-button">
          {title}</NavLink>
        
      }
    )
  }
    return (
    ReactDOM.createPortal((
      <>
      <div style={{display:"none",width:300}} id="mainSidebar" 
      className="w3-sidebar w3-bar-block  w3-animate-left w3-hide-large" >
     
    
      <button style={{width:"100%"}} 
      className="w3-bar-item w3-button w3-large w3-hide-large"
       onClick={()=>w3_close('mainSidebar')}>Close 
        <span className="w3-right">&times;</span></button>
        {create_buttons()}
       {/* <NavLink to="/static/products"  className="w3-bar-item w3-button ">Products
        </NavLink>
      <div className="w3-dropdown-hover">
      <button  className="w3-button">Sales</button>
      <div  className='w3-dropdown-content w3-bar-block w3-border'
      >
        <NavLink to="/static/sales/create"  className="w3-bar-item w3-button">Create</NavLink>
        <NavLink to="/static/sales/list"  className="w3-bar-item w3-button">List</NavLink>
        </div>
        </div>
      
     <NavLink to="/static/sessions" className="w3-bar-item  w3-button">Session</NavLink>
     <NavLink to="/static/playlists"  className="w3-bar-item w3-button">Playlists</NavLink>*/}
      
      {/*user ?(null):<a  href="/static/signin.html" 
      className="w3-bar-item w3-button tablinks">Login</a>*/} 
    
      </div>
      
     <div className="w3-bar w3-black">
     <button 
     className="w3-right w3-hide-large w3-button w3-teal w3-xlarge" 
     onClick={()=>w3_open('mainSidebar')}>&#9776;</button>
      <ul className="w3-hide-small">
     {create_buttons(true)}
      {/*<li  className="w3-bar-item">
        <NavLink to="/static/products"  className="w3-button">Products
        </NavLink></li>
      <li className="w3-dropdown-hover w3-mobile">
      <button  className="w3-button">Sales</button>
      <div  className='w3-dropdown-content w3-bar-block w3-border'
      >
        <NavLink to="/static/sales/create"  className="w3-bar-item w3-button">Create</NavLink>
        <NavLink to="/static/sales/list"  className="w3-bar-item w3-button">List</NavLink>
        </div></li>
      
      <li className="w3-bar-item w3-mobile" ><NavLink to="/static/stock" 
      className="w3-button">Stock</NavLink></li>
     <li className="w3-bar-item w3-mobile" ><NavLink to="/static/customers" 
      className="w3-button">Customers</NavLink></li>*/}
      {/*user ?(null):<li className="w3-bar-item w3-mobile">
        <a  href="/static/signin.html" 
    className="w3-bar-item w3-button tablinks">Login</a></li>*/}
      
      </ul>
      <UserCard     
      logout_path={logout_path}
      onLogout={onLogout}
      user={user} />
      </div>
    
    
    </>),
    document.getElementsByTagName('nav')[0]
    )
    )

}

const UserCard=({name,page,user,onLogout,logout_path})=>{
  if(!user)return null;
  const butt_props={};
  if(user.displayName)butt_props.onClick=()=>(w3_open('loginSidebar'));
  const userCard=(<div className="w3-right">
  <div id="avatar" className="chip">
   <button {...butt_props}  style={{ display:"contents"}}>
    <img  src="/resources/images/img_avatar_man.png" alt="Person" width="96" height="96" /></button>
   {user.displayName &&  <span className="w3-hide-small">{user.displayName}</span>}
  <UserCardMenu  logout_path={logout_path} 
  onLogout={onLogout}
  user={user} /></div></div>);
  
  return userCard
  }


  const UserCardMenu=({name,user,onLogout,logout_path})=>{
if(!user)return null;
if(!user.uid)return null;
const Logout=()=>{
if(onLogout)onLogout();
}
    const content= (
    <div className="w3-sidebar w3-bar-block w3-border-right" style={{display:"none"}} 
    id="loginSidebar">
      <button onClick={()=>w3_close('loginSidebar')} className="w3-bar-item w3-large">Close <span className="w3-right">&times;</span></button>
      <button  className="w3-bar-item w3-button">{user.displayName}</button>
      <a onClick={Logout}  href={logout_path} className="w3-bar-item w3-button">Logout</a>
    </div>)
    let container=document.getElementById('logout-menu');
    if(!container){
      const body=document.querySelector('body');
      const check=body.children[0];
      if(check.id!=='logout-menu'){
      container=document.createElement('div');
        container.id='logout-menu';
        body.insertBefore(container,check)
      }
    }

    return ReactDOM.createPortal(content,container)
    }