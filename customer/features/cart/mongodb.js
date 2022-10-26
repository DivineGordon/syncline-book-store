import {authHeader} from '../../utilities/auth';
export const saveOrderMongo=async (order)=>{
const books=[];
const bookIds=[];
for (const id of Object.keys(order.cart)){
const item={...order.cart[id]}
item.book=id;
delete item._id;
bookIds.push(id)
books.push(item)
}
order.books=books;
order.bookIds=bookIds;
delete order.cart;
const headers={'Content-Type':'application/json',...authHeader()};
const body=JSON.stringify({order})
  const res= await fetch('/api/orders/create',{method:'POST',body,headers})
    const {id}=await res.json()
return id
}