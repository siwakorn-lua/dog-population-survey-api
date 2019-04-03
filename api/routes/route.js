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
  app.route("/dog/update").post(dogController.updateDog);
  app.route("/dog/information/add").post(dogController.addDogInformation);
  app.route("/dog/vaccine/add").post(dogController.addDogVaccine);

  const reportController = require("../controller/reportController");
  // need authentication
  app.route("/report").post(reportController.countAllDog);
  app.route("/report/:province").post(reportController.countDogByProvince);
  app.route("/reportregion").post(reportController.countDogByRegion);
  app.route("/reportcsv").post(reportController.reportCsv);
};
