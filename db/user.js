const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/mydb1";

mongoose.connect(mongoDB, { useNewUrlParser: true });

const schema = mongoose.Schema({
  email: String,
  name: String,
  total_cost: Number,
  total_money: Number,
});

module.exports = mongoose.model("user", schema);
