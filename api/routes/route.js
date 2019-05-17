module.exports = function(app) {
  const userController = require("../controller/userController");

  // do not need authentication
  app.route("/login").post(userController.login);
  app.route("/register").post(userController.register);
  app.route("/forgot").post(userController.forgotPassword);
  app.route("/forgotForce").post(userController.forgotPasswordForce);
  app.route("/checkUsername").post(userController.checkUsername);
  // need authentication
  app.route("/user/update").post(userController.updateUser);

  const dogController = require("../controller/dogController");
  // need authentication
  app.route("/dog/add").post(dogController.addDog);
  app.route("/dog/update").post(dogController.updateDog);
  app.route("/dog/information/add").post(dogController.addDogInformation);
  app.route("/dog/vaccine/add").post(dogController.addDogVaccine);
  app.route("/dog/image/add").post(dogController.addDogImage);
  app.route("/dog/retrieve").post(dogController.retrieveDogData);

  const reportController = require("../controller/reportController");
  // need authentication
  app.route("/report").post(reportController.countAllDog);
  app.route("/report/:province").post(reportController.countDogByProvince);
  app.route("/reportregion").post(reportController.countDogByRegion);
  app.route("/reportcsv").post(reportController.exportReportFiles);
};
