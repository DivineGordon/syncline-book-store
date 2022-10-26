/*
Authorization:

GET /api/test/all
GET /api/test/user for loggedin users (user/moderator/admin)
GET /api/test/mod for moderator
GET /api/test/admin for admin
*/

const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");
const booksController = require("../controllers/books.controller");
const ordersController=require('../controllers/orders.controller');
const { formMultipartFile, formMultipartText } = require("../middlewares/form.multipart");
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", 
  [authJwt.verifyToken], controller.userBoard);

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );


//get books
  app.use(
    "/api/books/get",
   // [authJwt.verifyToken],
    booksController.getBooks
  );

  //update books
  app.post(
    "/api/books/update",
    [authJwt.verifyToken],
      // authJwt.isAdmin],
      formMultipartFile,
    booksController.updateBookText
  );
  app.post(
    "/api/books/update/image",
    [authJwt.verifyToken],
      // authJwt.isAdmin],
      formMultipartFile,
    booksController.updateBookFile
  );


  //create books
  app.post(
    "/api/books/create/image",
    [authJwt.verifyToken],
      // authJwt.isAdmin],
      formMultipartFile,
    booksController.createBook
  );
  app.post(
    "/api/books/create",
    [authJwt.verifyToken],
      // authJwt.isAdmin],
      formMultipartText ,
    booksController.createBook
  );

// delete book
app.post(
  "/api/books/delete",
  [authJwt.verifyToken],
  booksController.deleteBook
);



  //orders
  app.post(
    "/api/orders/create",
    [authJwt.verifyToken],
   ordersController.createOrder
  );
  app.post(
    "/api/orders/get",
    [authJwt.verifyToken],
   ordersController.getOrders
  );


};
