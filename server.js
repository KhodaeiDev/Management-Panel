const express = require("express");
require("dotenv").config();
const path = require("path");
const session = require("express-session");
const courseRouter = require("./routes/course");
const loginRouter = require("./routes/login");
require("./configs/db");

const app = express();

app.use("/css", express.static(path.join(__dirname, "public/style")));
app.use("/js", express.static(path.join(__dirname, "public/js")));
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use("/fonts", express.static(path.join(__dirname, "public/fonts")));

////////////
app.use(
  session({
    secret: "My secret key",
    saveUninitialized: true,
    resave: false,
  })
);
app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  next();
});
//////////

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
  return res.render("main");
});
app.get("/about-me", async (req, res) => {
  return res.render("about-me");
});

app.use("/courses", courseRouter);
app.use("/login", loginRouter);

// 404 Not Found
app.use((req, res) => {
  return res.render("404");
});

app.listen(process.env.Port, () => {
  console.log(`Server Running on Port ${process.env.Port}`);
});
