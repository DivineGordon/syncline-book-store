const mongoose =require( "mongoose");
//const  {SchemaTypes}=mongoose;
/*These Mongoose Models represents users & roles collections in MongoDB database.
User object will have a roles array that contains ids in roles collection as reference.

This kind is called Reference Data Models or Normalization.
*/
//todo :add user reference to purchase
const OrderSchema=new mongoose.Schema({
  date: {
    type:Date,
  immutable:true,
  default:()=>Date.now()
  },
  total_amount:Number,
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  bookIds:[{
    type:String
  }
   /* {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    }*/
  ],
  books: [
    {amount:Number,
    p_qty:Number,
    unit_price:Number,
    book:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    }}
  ]
})
const Order = mongoose.model(
  "Order",
  OrderSchema
);

module.exports= Order;