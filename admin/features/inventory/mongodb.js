import { authHeader } from "../../utilities/auth"
export const deleteBookMongo=async (_id) =>{
    const headers={'Content-Type':'application/json',
    ...authHeader()
}
const body=JSON.stringify({_id:_id})
   const res=await fetch('/api/books/delete',{headers,body,method:'POST'})
  return   await res.json()
}