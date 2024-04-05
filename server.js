const express = require("express");
require("dotenv").config();
const path = require("path");
const ejs = require("ejs");
const courseRouter = require("./routes/course");

const app = express();

app.use("/css", express.static(path.join(__dirname, "public/style")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/fonts", express.static(path.join(__dirname, "public/fonts")));

app.use(express.urlencoded({ extended: false }));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/courses", courseRouter);

app.get("/", async (req, res) => {
  res.render("index");
});
app.listen(process.env.Port, () => {
  console.log(`Server Running on Port ${process.env.Port}`);
});
