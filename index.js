var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/test", function(req, res) {
  res.json({ notes: "this is only test api" });
});

app.post("/register", function(req, res) {
  // do something here
});

app.post("/login", function(req, res) {
  // do something here
});

app.post("/forgot", function(req, res) {
  // do something here
});

app.post("/user/update", function(req, res) {
  // do something here
});

app.post("/dog/add", function(req, res) {
  // do something here
});

app.post("/dog/update", function(req, res) {
  // do something here
});

app.post("/dog/syn", function(req, res) {
  // do something here
});

app.post("/report", function(req, res) {
  // do something here
});

app.post("/report/request", function(req, res) {
  // do something here
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});