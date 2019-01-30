const dogModel = require("../model/dogModel");
const authController = require("../controller/authController");

exports.addDog = function(req, res) {
  authController.verifyToken(req, res, function() {
    let data = req.body;
    dogModel.addDog(data, (error, databack) => {
      if (error) throw error;
      res.json(databack);
    });
  });
};

exports.updateDog = function(req, res) {
  authController.verifyToken(req, res, function() {
    let data = req.body;
    dogModel.updateDog(data, (error, databack) => {
      if (error) throw error;
      res.json(databack);
    });
  });
};


