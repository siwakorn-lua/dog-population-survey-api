const dotenv = require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", ["*"]);
  res.append("Access-Control-Allow-Headers", ["*"]);
  next();
});

const route = require("./api/routes/route");
route(app);

app.listen(process.env.APP_PORT, () => console.log(`Listening on port ${process.env.APP_PORT}`));