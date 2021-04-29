require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
require("./db/conn");
const User = require("./models/userMessages");

const port = process.env.PORT || 8000;

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const publicPath = path.join(__dirname, "../public");
const partialsPath = path.join(__dirname, "../templates/partials");
const templatePath = path.join(__dirname, "../templates/views");

app.use(
  "/css",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css"))
);
app.use(
  "/js",
  express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js"))
);
app.use(
  "/jq",
  express.static(path.join(__dirname, "../node_modules/jquery/dist"))
);

app.use(express.static(publicPath));
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/contact", async (req, res) => {
  try {
    const userData = new User(req.body);
    await userData.save();
    res.status(201).render("index");
  } catch (e) {
    res.status(500).send(`Error: ${e}`);
  }
});

app.get("/*", (req, res) => {
  res.send("404,Page Not Found");
});

app.listen(port, () => {
  console.log(`listening to the port number ${port}`);
});
