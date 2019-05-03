const reportModel = require("../model/reportModel");
const authController = require("../controller/authController");
const jsonexport = require("jsonexport");
const fs = require("fs");
const nodemailer = require("nodemailer");
const moment = require("moment");

exports.countDogByRegion = function(req, res) {
  authController.verifyToken(req, res, function() {
    reportModel.countDogByRegion(req, (error, databack) => {
      if (error) throw error;

      let indoor_central, indoor_neast, indoor_north, indoor_south;
      let outdoor_central, outdoor_north, outdoor_neast, outdoor_south;
      let stray_central, stray_north, stray_neast, stray_south;
      indoor_central = 0;
      indoor_north = 0;
      indoor_neast = 0;
      indoor_south = 0;
      outdoor_central = 0;
      outdoor_neast = 0;
      outdoor_north = 0;
      outdoor_south = 0;
      stray_central = 0;
      stray_neast = 0;
      stray_north = 0;
      stray_south = 0;

      for (data in databack) {
        // North
        if (
          databack[data].country == "Chiang Rai" ||
          databack[data].country == "Chiang Mai" ||
          databack[data].country == "Mae Hong Son" ||
          databack[data].country == "Lamphun" ||
          databack[data].country == "Lampang" ||
          databack[data].country == "Phayao" ||
          databack[data].country == "Nan" ||
          databack[data].country == "Phrae" ||
          databack[data].country == "Uttaradit" ||
          databack[data].country == "Sukhothai" ||
          databack[data].country == "Tak" ||
          databack[data].country == "Kamphaeng Phet" ||
          databack[data].country == "Phetchabun" ||
          databack[data].country == "Phitsanulok" ||
          databack[data].country == "Phichit"
        ) {
          if (databack[data].dogType == "1") {
            indoor_north += databack[data].total;
          } else if (databack[data].dogType == "2") {
            outdoor_north += databack[data].total;
          } else {
            stray_north += databack[data].total;
          }
        }

        // Northeast
        else if (
          databack[data].country == "Loei" ||
          databack[data].country == "Nong Khai" ||
          databack[data].country == "Nong Bua Lam Phu" ||
          databack[data].country == "Sakon Nakhon" ||
          databack[data].country == "Sakon Nakhon" ||
          databack[data].country == "Nakhon Phanom" ||
          databack[data].country == "Mukdahan" ||
          databack[data].country == "Kon Kaen" ||
          databack[data].country == "Kalasin" ||
          databack[data].country == "Maha Sarakham" ||
          databack[data].country == "Roi Et" ||
          databack[data].country == "Yasothon" ||
          databack[data].country == "Amnat Charoen" ||
          databack[data].country == "Chaiyaphum" ||
          databack[data].country == "Si Sa Ket" ||
          databack[data].country == "Buriram" ||
          databack[data].country == "Nakhon Ratchasima" ||
          databack[data].country == "Surin" ||
          databack[data].country == "Ubon Ratchathani"
        ) {
          if (databack[data].dogType == "1") {
            indoor_neast += databack[data].total;
          } else if (databack[data].dogType == "2") {
            outdoor_neast += databack[data].total;
          } else {
            stray_neast += databack[data].total;
          }
        }
        // South
        else if (
          databack[data].country == "Songkhla" ||
          databack[data].country == "Phuket" ||
          databack[data].country == "Trang" ||
          databack[data].country == "Yala" ||
          databack[data].country == "Surat Thani" ||
          databack[data].country == "Narathiwat" ||
          databack[data].country == "Phatthalung" ||
          databack[data].country == "Pattani" ||
          databack[data].country == "Krabi" ||
          databack[data].country == "Chumphon" ||
          databack[data].country == "Ranong" ||
          databack[data].country == "Phangnga" ||
          databack[data].country == "Satun"
        ) {
          if (databack[data].dogType == "1") {
            indoor_south += databack[data].total;
          } else if (databack[data].dogType == "2") {
            outdoor_south += databack[data].total;
          } else {
            stray_south += databack[data].total;
          }
        }
        // Central
        else {
          if (databack[data].dogType == "1") {
            indoor_central += databack[data].total;
          } else if (databack[data].dogType == "2") {
            outdoor_central += databack[data].total;
          } else {
            stray_central += databack[data].total;
          }
        }
      }

      let dataOut = {
        all_central: indoor_central + outdoor_central + stray_central,
        indoor_central: indoor_central,
        outdoor_central: outdoor_central,
        stray_central: stray_central,
        all_north: indoor_north + outdoor_north + stray_north,
        indoor_north: indoor_north,
        outdoor_north: outdoor_north,
        stray_north: stray_north,
        all_south: indoor_south + outdoor_south + stray_south,
        indoor_south: indoor_south,
        outdoor_south: outdoor_south,
        stray_south: stray_south,
        all_neast: indoor_neast + outdoor_neast + stray_neast,
        indoor_neast: indoor_neast,
        outdoor_neast: outdoor_neast,
        stray_neast: stray_neast
      };
      res.json(dataOut);
    });
  });
};

exports.countAllDog = function(req, res) {
  authController.verifyToken(req, res, function() {
    reportModel.countAllDog(data, (error, databack) => {
      if (error) throw error;
      let numIndoor, numOutdoor, numStray;
      if (databack.length == 3) {
        numIndoor = databack[0].num;
        numOutdoor = databack[1].num;
        numStray = databack[2].num;
      } else if (databack.length == 2) {
        if (databack[0].dogType == "1" && databack[1].dogType == "2") {
          numIndoor = databack[0].num;
          numOutdoor = databack[1].num;
          numStray = 0;
        } else if (databack[0].dogType == "1" && databack[1].dogType == "3") {
          numIndoor = databack[0].num;
          numOutdoor = 0;
          numStray = databack[1].num;
        } else if (databack[0].dogType == "2" && databack[1].dogType == "3") {
          numIndoor = 0;
          numOutdoor = databack[0].num;
          numStray = databack[1].num;
        }
      } else if (databack.length == 1) {
        if (databack[0].dogType == "1") {
          numIndoor = databack[0].num;
          numOutdoor = 0;
          numStray = 0;
        } else if (databack[0].dogType == "2") {
          numIndoor = 0;
          numOutdoor = databack[0].num;
          numStray = 0;
        } else if (databack[0].dogType == "3") {
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
  });
};

exports.countDogByProvince = function(req, res) {
  console.log("coming")
  authController.verifyToken(req, res, function() {
    reportModel.countDogByProvince(req.params.province, (error, databack) => {
      if (error) throw error;
      else {
        let numIndoor, numOutdoor, numStray;
        numIndoor = 0;
        numOutdoor = 0;
        numStray = 0;
        if (databack.length == 3) {
          numIndoor = databack[0].num;
          numOutdoor = databack[1].num;
          numStray = databack[2].num;
        } else if (databack.length == 2) {
          if (databack[0].dogType == "1" && databack[1].dogType == "2") {
            numIndoor = databack[0].num;
            numOutdoor = databack[1].num;
            numStray = 0;
          } else if (databack[0].dogType == "1" && databack[1].dogType == "3") {
            numIndoor = databack[0].num;
            numOutdoor = 0;
            numStray = databack[1].num;
          } else if (databack[0].dogType == "2" && databack[1].dogType == "3") {
            numIndoor = 0;
            numOutdoor = databack[0].num;
            numStray = databack[1].num;
          }
        } else if (databack.length == 1) {
          if (databack[0].dogType == "1") {
            numIndoor = databack[0].num;
            numOutdoor = 0;
            numStray = 0;
          } else if (databack[0].dogType == "2") {
            numIndoor = 0;
            numOutdoor = databack[0].num;
            numStray = 0;
          } else if (databack[0].dogType == "3") {
            numIndoor = 0;
            numOutdoor = 0;
            numStray = databack[0].num;
          }
        }
        let dataOut = {
          all: numIndoor + numOutdoor + numStray,
          indoor: numIndoor,
          outdoor: numOutdoor,
          stray: numStray
        };
        console.log(dataOut);
        res.json(dataOut);
      }
    });
  });
};

exports.exportReportFiles = function(req, res) {
  authController.verifyToken(req, res, function() {
    if (req.body.username === "admin") {
      var tmp = req.body.email.split("@");
      var sv = tmp[1].split(".");
      const transporter = nodemailer.createTransport({
        service: sv[0],
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      reportModel.getAllUsers((error, userData) => {
        if (error) {
          console.log(error);
          res.status(400).json({
            status: "Fail",
            message: "Report cannot be generated right now."
          });
        } else {
          reportModel.getAllDogInformations((error, dogInformationData) => {
            if (error) {
              console.log(error);
              res.status(400).json({
                status: "Fail",
                message: "Report cannot be generated right now."
              });
            } else {
              reportModel.getDogImages((error, dogImageData) => {
                if (error) {
                  console.log(error);
                  res.status(400).json({
                    status: "Fail",
                    message: "Report cannot be generated right now."
                  });
                } else {
                  reportModel.getDogVaccines((error, dogVaccineData) => {
                    if (error) {
                      console.log(error);
                      res.status(400).json({
                        status: "Fail",
                        message: "Report cannot be generated right now."
                      });
                    } else {
                      jsonexport(userData, (error, userReport) => {
                        if (error) {
                          console.log(error);
                          res.status(400).json({
                            status: "Fail",
                            message: "Report cannot be generated right now."
                          });
                        } else {
                          jsonexport(
                            dogInformationData,
                            (error, dogInformationReport) => {
                              if (error) {
                                console.log(error);
                                res.status(400).json({
                                  status: "Fail",
                                  message:
                                    "Report cannot be generated right now."
                                });
                              } else {
                                jsonexport(
                                  dogImageData,
                                  (error, dogImageReport) => {
                                    if (error) {
                                      console.log(error);
                                      res.status(400).json({
                                        status: "Fail",
                                        message:
                                          "Report cannot be generated right now."
                                      });
                                    } else {
                                      jsonexport(
                                        dogVaccineData,
                                        (error, dogVaccineReport) => {
                                          if (error) {
                                            console.log(error);
                                            res.status(400).json({
                                              status: "Fail",
                                              message:
                                                "Report cannot be generated right now."
                                            });
                                          } else {
                                            const timestamp = moment().format(
                                              "MMMM Do YYYY, h:mm:ss a"
                                            );
                                            let mailOptions = {
                                              from: "Pupify",
                                              to: req.body.email,
                                              subject: "Report",
                                              html:
                                                "<p>The attachments are</p><ul><li>User Report</li><li>Dog Report</li><li>Dog Image Report</li><li>Dog Vaccine Report</li></ul><p><b>Generated : " +
                                                timestamp +
                                                "</b></p>",
                                              attachments: [
                                                {
                                                  filename: "User Report.csv",
                                                  content: userReport
                                                },
                                                {
                                                  filename: "Dog Report.csv",
                                                  content: dogInformationReport
                                                },
                                                {
                                                  filename:
                                                    "Dog Image Report.csv",
                                                  content: dogImageReport
                                                },
                                                {
                                                  filename:
                                                    "Dog Vaccine Report.csv",
                                                  content: dogVaccineReport
                                                }
                                              ]
                                            };
                                            transporter.sendMail(
                                              mailOptions,
                                              function(err, info) {
                                                if (err) {
                                                  console.log(err);
                                                  res.status(400).json({
                                                    status: "Fail",
                                                    message:
                                                      "Report cannot be generated right now."
                                                  });
                                                } else {
                                                  console.log("send!!");
                                                  res.status(400).json({
                                                    status: "Success",
                                                    message:
                                                      "Reports have been sent into your email."
                                                  });
                                                }
                                              }
                                            );
                                          }
                                        }
                                      );
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};
