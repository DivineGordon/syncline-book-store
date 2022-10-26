const mongoose = require('mongoose');

//mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.book = require("./book.model");
db.order = require("./orders.model");
db.picture= require("./picture.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;