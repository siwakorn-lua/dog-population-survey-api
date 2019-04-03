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
  authController.verifyToken(req, res, function() {
    dogModel.addDogInformation(req.body, (error, databack) => {
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

exports.addDogVaccine = function(req, res) {
  authController.verifyToken(req, res, function() {
    dogModel.addDogVaccine(req.body, (error, databack) => {
      if (error) console.log(error);
      if (databack) {
        console.log(databack);
        res.status(200).json({
          status: "Success",
          message: "Your dog vaccine has been added.",
          data: databack
        });
      }
    });
  });
};
