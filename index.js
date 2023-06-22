const express = require("express");
const app = express();

app.use(express.json());
app.set("views", __dirname + "/views");
app.set("view engine", "hbs");

const cities = ["Paris", "London", "Berlin"];

app.get("/", (req, res) => {
  res.render("index", { cities: cities });
});

app.post("/", (req, res) => {
  const { city } = req.body;
  if (city) {
    cities.push(city);
    res.status(201).send(`the ${city} has been added to the array of cities`);
  } else {
    res.status(400).send(`no city was given in the post request`);
  }
});

app.listen(3000);
