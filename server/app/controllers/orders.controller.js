/*    
- /api/orders/get
- /api/orders/create
 */
const Order=require('../models/orders.model')
exports.getOrders=async (req,res,next)=>{
   const {user_id}=req.body
   console.log(user_id)
   const user={};
  if(user_id){
    user.user=user_id
  }
   
try{
  const  docs= await Order.find(user).populate('books.book') .exec()
 // console.log(docs)
   res.json({orders:docs})
    }catch(e){
      console.log(e)
next(e)
    }

}

exports.createOrder=async (req,res,next)=>{
    const order=req.body.order
    try{
     const id= await  Order.create(order)
     res.status(201).json({id})
    }catch(e){
        next(e)
    }
}