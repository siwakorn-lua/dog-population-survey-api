const reportModel = require("../model/reportModel");
const authController = require("../controller/authController");
const jsonexport = require("jsonexport");
const fs = require("fs");
const nodemailer = require("nodemailer");

exports.countDogByRegion = function(req, res) {
  authController.verifyToken(req, res, function() {    
    if (req.body.username == "admin"){
      res
        .status(400)
        .json({ message: "You do not have an authority to access the data." });
    }
    else {
      reportModel.countDogByRegion(req, (error, databack) => {
        if (error) throw error;

        let indoor_central, indoor_neast, indoor_north, indoor_south;
        let outdoor_central, outdoor_north, outdoor_neast, outdoor_south;
        let stray_central, stray_north, stray_neast, stray_south;
        indoor_central=0; indoor_north=0; indoor_neast=0; indoor_south=0;
        outdoor_central=0; outdoor_neast=0; outdoor_north=0; outdoor_south=0;
        stray_central=0; stray_neast=0; stray_north=0; stray_south=0;

        for(data in databack){

           // North
           if(databack[data].country == "Chiang Rai" || databack[data].country == "Chiang Mai" || databack[data].country == "Mae Hong Son"
           || databack[data].country == "Lamphun" || databack[data].country == "Lampang" || databack[data].country == "Phayao" || 
           databack[data].country == "Nan" || databack[data].country == "Phrae" || databack[data].country == "Uttaradit" ||
            databack[data].country == "Sukhothai" || databack[data].country =="Tak" || databack[data].country == "Kamphaeng Phet" ||
            databack[data].country == "Phetchabun" || databack[data].country == "Phitsanulok" || databack[data].country == "Phichit" ){

               if(databack[data].dogType == "indoor"){
                   indoor_north += databack[data].total;
               }
               else if(databack[data].dogType == "outdoor"){
                   outdoor_north += databack[data].total;
               }
               else{
                   stray_north += databack[data].total;
               }
           }

          // Northeast
           else if(databack[data].country == "Loei" || databack[data].country == "Nong Khai" || databack[data].country == "Nong Bua Lam Phu" ||
           databack[data].country == "Sakon Nakhon" || databack[data].country == "Sakon Nakhon" || databack[data].country == "Nakhon Phanom" ||
           databack[data].country == "Mukdahan" || databack[data].country == "Kon Kaen" || databack[data].country == "Kalasin"
           || databack[data].country == "Maha Sarakham" || databack[data].country == "Roi Et" || databack[data].country == "Yasothon" || 
           databack[data].country == "Amnat Charoen" || databack[data].country == "Chaiyaphum" || databack[data].country == "Si Sa Ket" ||
           databack[data].country == "Buriram" || databack[data].country == "Nakhon Ratchasima" || databack[data].country == "Surin" ||
           databack[data].country == "Ubon Ratchathani"){

             if(databack[data].dogType == "indoor"){
                 indoor_neast += databack[data].total;
             }
             else if(databack[data].dogType == "outdoor"){
                 outdoor_neast += databack[data].total;  
             }
             else{
                 stray_neast += databack[data].total;
             }

           }
          // South
           else if(databack[data].country == "Songkhla" || databack[data].country == "Phuket" || databack[data].country == "Trang" ||
           databack[data].country == "Yala" || databack[data].country == "Surat Thani" || databack[data].country == "Narathiwat" ||
           databack[data].country == "Phatthalung" || databack[data].country == "Pattani" || databack[data].country == "Krabi"
           || databack[data].country == "Chumphon" || databack[data].country == "Ranong" || databack[data].country == "Phangnga" ||
           databack[data].country == "Satun" ){

             if(databack[data].dogType == "indoor"){
                 indoor_south += databack[data].total;
             }
             else if(databack[data].dogType == "outdoor"){
                 outdoor_south += databack[data].total;
             }
             else{
               stray_south += databack[data].total;
             }

           }
          // Central
           else{

             if(databack[data].dogType == "indoor"){
                 indoor_central += databack[data].total;
             }
             else if(databack[data].dogType == "outdoor"){
                 outdoor_central += databack[data].total;
             }
             else{
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
    }
  });
};

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
    if (req.body.username == "admin"){
      res
        .status(400)
        .json({ message: "You do not have an authority to access the data." });
    }
    else {
      reportModel.countDogByProvince(req.params.province, (error, databack) => {
        if (error) throw error;
        else{
        let numIndoor, numOutdoor, numStray;
        numIndoor = 0;
        numOutdoor = 0;
        numStray = 0;
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
        } 
        let dataOut = {
          all: numIndoor + numOutdoor + numStray,
          indoor: numIndoor,
          outdoor: numOutdoor,
          stray: numStray
        };
        res.json(dataOut);
      }
      });
    }
  });
};

exports.reportCsv = function(req, res) {
  authController.verifyToken(req, res, function() {
    console.log(req.body.email);
    var tmp = req.body.email.split("@");
    var sv = tmp[1].split(".");
    console.log(sv[0]);
    const transporter = nodemailer.createTransport({
      service: sv[0],
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    reportModel.reportCsv(req, (error, databack) => {
      if (error) throw error;
      
      jsonexport(databack, function(err, csv) {
        if (err) return console.log(err);
        fs.writeFile(
          "C:/Users/nuch_/Desktop/Doggy/dog-population-survey-api/db/exportAllDog.csv",
          csv,
          function(err) {
            if (err) {
              return console.log(err);
            }
          }
        );
        let mailOptions = {
          from: "JJ", // sender
          to: req.body.email, // list of receivers
          subject: "Dog Info .Csv", // Mail subject
          html: "<b>Do you receive this mail?</b>", // HTML body
          attachments: [
            {
              filename: "test.csv",
              content: csv
            }
          ]
        };
        transporter.sendMail(mailOptions, function(err, info) {
          if (err) throw err;
          else console.log("Sent!!!");
        });
        res.json(csv);
      });
    });
  });
};
