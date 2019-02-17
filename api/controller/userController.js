const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const authController = require("../controller/authController");

exports.register = function(req, res) {
  const salt = bcrypt.genSaltSync(10);
  let data = req.body;
  data.password = bcrypt.hashSync(data.password, salt);
  userModel.register(data, (error, databack) => {
    if (error) throw error;
    else{
      res.status(200).send({message: "Successfully register"})
    }
  });
};

exports.login = function(req, res) {
  userModel.getUserByUsername(req.body, (error, data) => {
    if (error) throw error;

    if (data.length == 0) {
      res.status(200).send({ message: "ไม่มีชื่อผู้ใช้นี้ในระบบ" });
    } else {
      var user = data[0];

      bcrypt.compare(req.body.password, user.password, function(err, match) {
        if (err) {
          console.log(err);
          res.status(200).send("ขณะนี้ระบบกำลังมีปัญหา");
        }
        if (match) {
          const token = jwt.sign({ username: user.username }, process.env.SECRET);
          res.json({ token: token });
        } else {
          res.status(200).send({ message: "รหัสผ่านไม่ถูกต้อง" });
        }
      });
    }
  });
};

exports.updateUser = function(req, res) {
  authController.verifyToken(req, res, function() {
    let data = req.body;
    userModel.updateUser(data, (error, databack) => {
      if (error) throw error;
      res.status(200).json(databack);
    });
  });
};

exports.retrieveUserData = function(req, res){
  authController.verifyToken(req, res, function(){
    userModel.getUserByUsername(req.body, (err, databack) => {
      if(err){
        console.log(err)
        res.status(200).json(err)
      }else{
        res.status(200).json(databack)
      }
    })
  })
}

exports.forgotPassword = function(req, res) {
  let data = req.body;
  userModel.forgotPassword(data, (error, databack) => {
    if (error) throw error;
    res.status(200).json(databack);
  });
};
