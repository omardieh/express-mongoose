const mongoose = require("mongoose");
const express = require("express");
const app = express();
const User = require("./models/User.js");

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

function connectToMongoose() {
  try {
    mongoose
      .connect("mongodb://127.0.0.1:27017/examples")
      .then((resp) => console.log(`connected to ${resp.connections[0].name}`))
      .catch((err) => console.error(err));
  } catch (error) {
    console.log(error);
  }
}
connectToMongoose();

function generateUser() {
  const user1 = new User({
    email: "email@example.com",
    username: "helloKitty123",
  });
  user1
    .save()
    .then((newUser) => console.log(`created ${newUser.email}`))
    .catch((err) => console.error(err));
}
//generateUser();

function getAllUsers() {
  return User.find({}).then((users) => users);
}

app.get("/", (req, res) => {
  User.find().then((users) => {
    res.render("index", { users });
  });
});

// app.get("/", async (req, res) => {
//   const users = await getAllUsers();
//   console.log(users);
//   res.render("index", { users });
// });

app.listen(3000);
