const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// PROMISE //
// const promise = require('bluebird');

// const option = {
//     promiseLib: promise
// };
// const pgPromise = require('pg-promise')(option);
// global.db = pgPromise(config);

const port = 9000; // Running PORT //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", ["*"]);
  res.append("Access-Control-Allow-Headers", ["*"]);
  next();
});

// API //
const route = require("./api/routes/route");
route(app);

app.listen(port, () => console.log(`Listening on port ${port}`));

// REALTIME USING SOCKET IO //
// var serverBackEnd = app.listen(port);
// global.ioBackEnd = listen(serverBackEnd);

// global.ioBackEnd.on('connection', socket => {
//     console.log('connect')
//     socket.on('disconnect',() => {
//         console.log('disconnect')
//     })
// })
