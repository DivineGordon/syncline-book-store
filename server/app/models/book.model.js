//create User and Role data model 
const mongoose =require( "mongoose");

const BookSchema= new mongoose.Schema({
  title: String,
  description:String,
  img:String,
    picture:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Picture'
    },
    quantity:Number,
    unit_price:String
})
const Book = mongoose.model(
  "Book",
 BookSchema
);

module.exports = Book;