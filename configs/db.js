const mongoose = require("mongoose");

const dbURI = "mongodb://127.0.0.1:27017/node-ejs";

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to DB Successfully"))
  .catch((err) => console.log("Error =>", err));
