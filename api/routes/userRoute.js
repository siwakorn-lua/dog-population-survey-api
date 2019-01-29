module.exports = function(app) {
  const userController = require("../controller/userController");
  app.route("/login").post(userController.login);
  app.route("/register").post(userController.register);
  app.route("/updateUser/:username").post(userController.updateUser);
  app.route("/forgot").post(userController.forgotPassword);

  const dogController = require('../controller/dogController')
  app.route("/addDog").post(dogController.addDog);
  app.route("/updateDog").post(dogController.addDog);

  const reportController = require('../controller/reportController')
  app.route("/report").get(reportController.countAllDog);
  app.route("/report/:province").get(reportController.countDogByProvince);
};
