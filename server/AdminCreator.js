const db = require("./server/app/models");
const bcrypt = require("bcryptjs");
const prompt=require('prompt-sync')()
const dbConfig={
    HOST:'localhost',
    PORT:27017,
    DB:'local'
  }
const alphaTest=/[a-zA-Z]+\d*[a-zA-Z]+/
const numTest=/\d+/

  db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connect to MongoDB.");
   
    })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });
const User= db.user
const Role=db.role
    const getInput=(message)=>{
        let input;
    while(input!=null){
        input=prompt(message)
    }
    return input
    }
    const getPassword=()=>{
        let input;
        while(!alphaTest.test(input) && !numTest.test(input) && input.length && input.length>=6){
            console.log('password must contain letters and numbers')
            console.log('it must be at least 6 characters')
            input=prompt.hide('enter password:')
        }
        return input
    }
    const createUser=async(username,email,password)=>{
  const doc=  await  User.findOne({email}).exec()
   if(doc){
    console.log('Failed! email already exists'); 
    process.exit()
    }    
      
      password= bcrypt.hashSync(password, 8)
         const role=await Role.findOne(
             {
               name: 'admin'
             }).exec()
         const user_data={
             username,
             email,
             password,
             
         }
        const user=await User.create(user_data)
        user.roles.push(role)
        const savedUser=await user.save()
        console.log('Admin created id '+savedUser.id)
        console.log('Email: '+savedUser.email)
        console.log('Username: '+savedUser.username)
        process.exit()
     }
     
    const username=prompt('enter user name:')
    const email=prompt('enter email address:')
    const password1=prompt.hide('enter password:')
    const password2=prompt.hide('enter password again:')
    if(password1!==password2){
        console.log('passwords do not match')
        process.exit()
    }
    createUser(username,email,password1)







const createAdmin=()=>{
    const username=getInput('enter user name:')
    const email=getInput('enter email address:')
    const password=getPassword()
    createUser(username,email,password)
}
   