const mongoose=require("mongoose");


const PictureSchema=new mongoose.Schema({
name:String,
data:mongoose.Schema.Types.Buffer,
mimetype:String,
size:Number
})
const Picture=mongoose.model("Picture",PictureSchema)

module.exports=Picture