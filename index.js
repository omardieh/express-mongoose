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

const Student = mongoose.model("Student", {
  firstName: {
    type: String,
    unique: true,
  },
});
const City = mongoose.model("City", {
  name: {
    type: String,
    unique: true,
  },
});

async function handleManyInserts(array, model) {
  const insertedItems = [];
  for (const element of array) {
    try {
      const newItem = await model.create(element);
      insertedItems.push(newItem);
    } catch (err) {
      console.error(err);
    }
  }
  return insertedItems;
}

const students = [{ firstName: "Marco" }, { firstName: "Nina" }];
const cities = [{ name: "Berlin" }, { name: "London" }];

Promise.all([
  handleManyInserts(students, Student),
  handleManyInserts(cities, City),
])
  .then((resp) => console.log(resp))
  .catch((e) => console.log(e));
