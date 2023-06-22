const mongoose = require("mongoose");

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

function createCatModel() {
  const Cat = mongoose.model("Cat", { name: String });
  return Cat;
}
const Cat = createCatModel();

function addNewKitty(name) {
  const kitty = new Cat({ name: name });
  kitty
    .save()
    .then((resp) => console.log(resp))
    .catch((err) => console.error(err));
}

function showAllCats() {
  Cat.find()
    .then((resp) => console.log(resp))
    .catch((err) => console.error(err));
}

function add10Kitties() {
  for (let i = 0; i < 10; i++) {
    addNewKitty(`${i} kitty`);
  }
}

add10Kitties();

setTimeout(showAllCats, 1500);
