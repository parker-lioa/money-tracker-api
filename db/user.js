const mongoose = require("mongoose");
const mongoDB = "mongodb://localhost:27017/mydb1";

mongoose.connect(mongoDB, { useNewUrlParser: true });

const schema = mongoose.Schema({
  mail: String,
  name: String,
});

module.exports = mongoose.model("user", schema);
