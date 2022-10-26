const express = require("express");
const cors = require("cors");
const path=require('path')
const morgan=require('morgan')
const db = require("./app/models");
const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(morgan('dev'))
app.use('/static',express.static(__dirname+'/static'))
app.use('/assets',express.static(__dirname+'/static/login/assets'))
//app.use('/assets',express.static(__dirname+'/static/assets'))

app.use('/resources',express.static("C:\\Users\\user\\Documents\\gordon_work\\RESOURCES"))
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/picture.routes')(app);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});



const Role = db.role;
const Book=db.book;

//change mongo database config to fit your system mongo config
const dbConfig={
  HOST:'localhost',
  PORT:27017,
  DB:'local'
}
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initialDB();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  async function initialDB() {
    //adding roles on startup
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
//adding startup book data
const numBooks=await Book.estimatedDocumentCount();
if (numBooks=== 0) {
 await  Book.create({
    title:'Harry Potter Socerer Stone',
quantity:34,
unit_price:30
   },  {title:'Ananse',
   quantity:44,
   unit_price:12.8
      },{
        title:'cinderaella',
        quantity:67,
unit_price:13.32
      }) 
  }

 
  }

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});