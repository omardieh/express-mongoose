const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  avatarUrl: {
    type: String,
    default: "images/img.jpg",
  },
});

module.exports = mongoose.model("User", userSchema);
