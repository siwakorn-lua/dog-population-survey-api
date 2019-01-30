const reportModel = require("../model/reportModel");
const authController = require("../controller/authController");

exports.countAllDog = function(req, res) {
  authController.verifyToken(req, res, function() {
    if (req.body.username != "admin")
      res
        .status(400)
        .json({ message: "You do not have an authority to access the data." });
    else {
      reportModel.countAllDog(data, (error, databack) => {
        if (error) throw error;
        let numIndoor, numOutdoor, numStray;
        if (databack.length == 3) {
          numIndoor = databack[0].num;
          numOutdoor = databack[1].num;
          numStray = databack[2].num;
        } else if (databack.length == 2) {
          if (
            databack[0].dogType == "indoor" &&
            databack[1].dogType == "outdoor"
          ) {
            numIndoor = databack[0].num;
            numOutdoor = databack[1].num;
            numStray = 0;
          } else if (
            databack[0].dogType == "indoor" &&
            databack[1].dogType == "stray"
          ) {
            numIndoor = databack[0].num;
            numOutdoor = 0;
            numStray = databack[1].num;
          } else if (
            databack[0].dogType == "outdoor" &&
            databack[1].dogType == "stray"
          ) {
            numIndoor = 0;
            numOutdoor = databack[0].num;
            numStray = databack[1].num;
          }
        } else if (databack.length == 1) {
          if (databack[0].dogType == "indoor") {
            numIndoor = databack[0].num;
            numOutdoor = 0;
            numStray = 0;
          } else if (databack[0].dogType == "outdoor") {
            numIndoor = 0;
            numOutdoor = databack[0].num;
            numStray = 0;
          } else if (databack[0].dogType == "stray") {
            numIndoor = 0;
            numOutdoor = 0;
            numStray = databack[0].num;
          }
        } else {
          res.status(400).json({ message: "impossible data" });
        }
        let dataOut = {
          all: numIndoor + numOutdoor + numStray,
          indoor: numIndoor,
          outdoor: numOutdoor,
          stray: numStray
        };
        res.json(dataOut);
      });
    }
  });
};

exports.countDogByProvince = function(req, res) {
  authController.verifyToken(req, res, function() {
    if (req.body.username != "admin")
      res
        .status(400)
        .json({ message: "You do not have an authority to access the data." });
    else {
      reportModel.countDogByProvince(req.params.province, (error, databack) => {
        if (error) throw error;
        let numIndoor, numOutdoor, numStray;
        if (databack.length == 3) {
          numIndoor = databack[0].num;
          numOutdoor = databack[1].num;
          numStray = databack[2].num;
        } else if (databack.length == 2) {
          if (
            databack[0].dogType == "indoor" &&
            databack[1].dogType == "outdoor"
          ) {
            numIndoor = databack[0].num;
            numOutdoor = databack[1].num;
            numStray = 0;
          } else if (
            databack[0].dogType == "indoor" &&
            databack[1].dogType == "stray"
          ) {
            numIndoor = databack[0].num;
            numOutdoor = 0;
            numStray = databack[1].num;
          } else if (
            databack[0].dogType == "outdoor" &&
            databack[1].dogType == "stray"
          ) {
            numIndoor = 0;
            numOutdoor = databack[0].num;
            numStray = databack[1].num;
          }
        } else if (databack.length == 1) {
          if (databack[0].dogType == "indoor") {
            numIndoor = databack[0].num;
            numOutdoor = 0;
            numStray = 0;
          } else if (databack[0].dogType == "outdoor") {
            numIndoor = 0;
            numOutdoor = databack[0].num;
            numStray = 0;
          } else if (databack[0].dogType == "stray") {
            numIndoor = 0;
            numOutdoor = 0;
            numStray = databack[0].num;
          }
        } else {
          res.status(400).json({ message: "impossible data" });
        }
        let dataOut = {
          all: numIndoor + numOutdoor + numStray,
          indoor: numIndoor,
          outdoor: numOutdoor,
          stray: numStray
        };
        res.json(dataOut);
      });
    }
  });
};
