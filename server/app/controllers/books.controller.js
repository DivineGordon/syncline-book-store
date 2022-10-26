/*    
- /api/books/get
- /api/books/create
 */
const  Picture  = require('../models/picture.model')
const Book=require('../models/book.model')
const Order = require('../models/orders.model')

exports.getBooks=async (req,res,next)=>{
   let title={}
  
    if(req.body.title){
title.title={$regex: '.*' + req.body.title+ '.*'}
    }
    try{
  const  docs= await Book.find(title).exec()
 // console.log(docs)
   res.json({books:docs})
    }catch(e){
next(e)
    }

}

    

exports.createBook=async (req,res,next)=>{

    const book={...req.body}
    let image,picDoc,file;
    if(req.file){
      file =req.file;
        image={
            data:file.buffer,
            size:file.size,
            mimetype:file.mimetype,
            originalname:file.originalname,
            encoding:file.encoding
        }
    try{
            picDoc= await Picture.create(image)
    }catch(e){
      return  next(e)
    }
}
    try{
            book.picture=picDoc;
            //book.img=picDoc.id+'.'+
     const BookDoc= await  Book.create(book)
     res.status(201).json({BookDoc})
    }catch(e){
      return  next(e)
    }
}
const jpgRE=/jpg|jpeg/i
exports.updateBookFile=async (req,res,next)=>{

    const book={...req.body}
    const {id}=book;
    delete book.id;
    let image,picId,file,BookDoc;
    if(req.file){
      file=req.file;
        image={
            data:file.buffer,
            size:file.size,
            mimetype:file.mimetype,
            originalname:file.originalname,
            encoding:file.encoding
        }
    try{
            picId= await Picture.create(image)
    }catch(e){
     return   next(e)
    }
}
    try{
    if(picId){
     //const jpgTest=jpgRE.test(file.mimetype)
     book.picture=picId;
    // book.img=`${picId}.${jpgTest?'jpg':'png'}`;
    }
     BookDoc= await  Book.updateOne( {_id:id}, book)
     if(BookDoc.acknowledged){
     res.status(201).json({BookDoc})
    }
    else {
        res.status(422).json({message:'update failure'})
    }
    }catch(e){
        next(e)
    }
}
exports.updateBookText=async (req,res,next)=>{

    const book={...req.body}
    const {id}=book;
    delete book.id;
    let BookDoc;
    try{
    
      BookDoc= await  Book.updateOne( {_id:id}, book)
     if(BookDoc.acknowledged){
     res.status(201).json({BookDoc})
    }
    else {
        res.status(422).json({message:'update failure'})
    }
    }catch(e){
        next(e)
    }
}

exports.deleteBook=async (req,res,next)=>{
    const _id=req.body._id
    try{
 const doc=await Order.findOne({bookIds:_id}).exec()
 if(doc){
 res.status(422).json({message:'failure order exists',_id})
}
 try{
    const resObj= await  Book.deleteOne ({_id})
    if(resObj.deletedCount!==undefined && resObj.deletedCount>=1){
    res.status(200).json({message:'success',_id,DeleteResult:resObj})
   }
}catch(e){
    res.status(400).json({message:'failure',_id})
   // next(e)
}
    }catch(e){
   next(e)
    }

   
}