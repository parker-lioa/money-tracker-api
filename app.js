var express = require("express");
var routes = require("./routes");
var body_parser = require("body-parser");
var app = express();

var port = process.env.PORT || 80;

// middleware to encode form-data

app.use( body_parser.json());
app.use( body_parser.urlencoded({ extended : true }));

app.use("/api", routes);


app.get("/", (req, res) => {
  res.send("<div>Hello fucking world!</div>");
});

app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});
