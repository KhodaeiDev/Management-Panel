const mongoose = require("mongoose");

const dbURI = process.env.DB_URI;

mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to DB Successfully"))
  .catch((err) => console.log("Error =>", err));
