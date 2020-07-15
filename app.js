var express = require("express");
var app = express();
var db = require("./db");
global.__root = __dirname + "/";

app.get("/api", function (req, res) {
  res.status(200).send("API works.");
});

var UserController = require(__root + "/Controllers/user/UserController");
app.use("/api/users", UserController);

var AuthController = require(__root + "Controllers/auth/AuthController");
app.use("/api/auth", AuthController);

var NewsController = require(__root + "Controllers/news/NewsController");
app.use("/api/news", NewsController);

module.exports = app;
