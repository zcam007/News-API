require("dotenv").config();

var mongoose = require("mongoose");
var uri =
  "mongodb+srv://" +
  process.env.DB_HOST +
  "/test?authSource=admin&replicaSet=atlas-7nval0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected…");
  })
  .catch((err) => console.log(err));
