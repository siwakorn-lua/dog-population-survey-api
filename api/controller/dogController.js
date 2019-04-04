const dogModel = require("../model/dogModel");
const authController = require("../controller/authController");
const formidable = require("formidable");
const fs = require("fs");
const AWS = require("aws-sdk");

const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;
AWS.config.update({ region: "ap-southeast-1" });
s3 = new AWS.S3();

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

exports.addDogImage = function(req, res) {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        status: "Fail",
        message: "Your dog image has not been added.",
        data: databack
      });
    }
    if (files.dogImage) {
      var authData = {
        headers: req.headers,
        body: fields
      };
      authController.verifyToken(authData, res, function() {
        var keyName =
          "uploads/" + fields.username + "/dog-image-" + fields.side + ".jpg";
        var fileStream = fs.createReadStream(files.dogImage.path);
        fileStream.on("error", function(err) {
          console.log("File Error", err);
          res.status(400).json({
            status: "Fail",
            message: "Your dog image has not been added.",
            data: databack
          });
        });
        var params = {
          Body: fileStream,
          Bucket: process.env.BUCKET_NAME,
          Key: keyName,
          ACL: "public-read"
        };
        s3.upload(params, (err, imgData) => {
          if (err) {
            console.log(err);
            res.status(400).json({
              status: "Fail",
              message: "Your dog image has not been added.",
              data: databack
            });
          } else {
            data = {
              dogID: fields.dogID,
              side: fields.side,
              imageLocation: imgData.Location
            };
            dogModel.addDogImage(data, (error, databack) => {
              if (error) {
                console.log(error);
                res.status(400).json({
                  status: "Fail",
                  message: "Your dog image has not been added.",
                  data: databack
                });
              } else if (databack) {
                console.log(databack);
                res.status(200).json({
                  status: "Success",
                  message: "Your dog vaccine has been added.",
                  data: databack
                });
              }
            });
            fs.unlink(files.dogImage.path, err => {
              if (err) console.log(err);
            });
          }
        });
      });
    }
  });
};
