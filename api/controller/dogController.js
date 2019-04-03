const dogModel = require("../model/dogModel");
const authController = require("../controller/authController");

exports.addDog = function(req, res) {
  authController.verifyToken(req, res, function() {
    dogModel.addDog(req.body, (error, databack) => {
      if (error) console.log(error);
      if (databack) {
        res.status(200).json({
          status: "Success",
          message: "Your dog has been added.",
          data: databack
        });
      }
    });
  });
};

exports.updateDog = function(req, res) {
  authController.verifyToken(req, res, function() {
    let data = req.body;
    dogModel.updateDog(data, (error, databack) => {
      if (error) console.log(error);
      if (databack) {
        console.log(databack);
        res.status(200).json({
          status: "Success",
          message: "Your dog has been added.",
          data: databack
        });
      }
    });
  });
};

exports.addDogInformation = function(req, res) {
  console.log("incoming data ...");
  authController.verifyToken(req, res, function() {
    let data = req.body;
    dogModel.addDogInformation(data, (error, databack) => {
      if (error) console.log(error);
      if (databack) {
        console.log(databack);
        res.status(200).json({
          status: "Success",
          message: "Your dog information has been added.",
          data: databack
        });
      }
    });
  });
};
