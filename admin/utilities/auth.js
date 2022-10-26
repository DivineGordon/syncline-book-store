import { getUser } from "../features/user/mongodb";

export function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      // for Node.js Express back-end
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }

export const getLocalUser=()=>{
    let user = JSON.parse(localStorage.getItem('user'));
    if (user)return user;
    return null
}