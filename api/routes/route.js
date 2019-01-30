module.exports = function(app) {
  const userController = require("../controller/userController");
  // do not need authentication
  app.route("/login").post(userController.login);
  app.route("/register").post(userController.register);
  app.route("/forgot").post(userController.forgotPassword);
  // need authentication
  app.route("/user/update").post(userController.updateUser);
  app.route("/user/retrieve").post(userController.retrieveUserData);

  const dogController = require("../controller/dogController");
  // need authentication
  app.route("/dog/add").post(dogController.addDog);
  app.route("/updateDog").post(dogController.updateDog);

  const reportController = require("../controller/reportController");
  // need authentication
  app.route("/report").get(reportController.countAllDog);
  app.route("/report/:province").get(reportController.countDogByProvince);
  app.route("/reportcsv").get(reportController.reportCsv);
};
