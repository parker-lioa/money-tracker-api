const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/mydb1";
mongoose.connect(mongoDB, { useNewUrlParser: true });

const schema = mongoose.Schema({
  user: String,
  cost: String,
  category: String,
  updated_time: Date,
});

module.exports = mongoose.model("record", schema);
