//serve image files
const Picture=require('../models/picture.model')
exports.getImage=async (req,res,next)=>{
  let picDoc;
    try{
  picDoc= await  Picture.findOne({_id:req.params.id})
    }
    catch(e){
        console.log(e)
       return next(e)
    }
    res.set('Content-Type',picDoc.mimetype)
   
  res.status(200).send(Buffer.from( picDoc.data,'base64'))
}