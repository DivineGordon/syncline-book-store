import { authHeader } from "../../utilities/auth";

export const getUser=async ()=>{
   const headers={...authHeader()}
    const res=  await   fetch('/api/user',{headers});
   const data=await res.json()
   return data.user
}