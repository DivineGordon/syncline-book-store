import {authHeader} from '../../utilities/auth'
import axios from 'axios'
export const getOrdersMongo=async (user_id)=>{
    const headers={'Content-Type':'application/json',...authHeader()}
    const body=JSON.stringify({user_id})
   try{
   const res= await axios.post('/api/orders/get',
   {user_id},{headers})
   return res.data.orders
    //const res=await fetch('/api/orders/get',{method:'POST',headers,body})
   //const data=await res.json()
   //return data.orders
    } catch(e){
        return Promise.reject(e)
    }
  
}