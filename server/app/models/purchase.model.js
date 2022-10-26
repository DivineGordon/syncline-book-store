const mongoose =require( "mongoose");
//const  {SchemaTypes}=mongoose;
/*These Mongoose Models represents users & roles collections in MongoDB database.
User object will have a roles array that contains ids in roles collection as reference.

This kind is called Reference Data Models or Normalization.
*/
//todo :add user reference to purchase
const PurchaseSchema=new mongoose.Schema({
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
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book"
    }
  ]
})
const Purchase = mongoose.model(
  "Purchase",
  PurchaseSchema
);

exports= Purchase;