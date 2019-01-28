module.exports = function(app) {
  const userController = require("../controller/userController");
  app.route("/register").post(userController.register);
  app.post("/updateUser/:username").post(userController.updateUser);

  const dogController = require('../controller/dogController')
  app.route("/addDog").post(dogController.addDog);
  app.route("/updateDog").post(dogController.addDog);
};
