const bcrypt = require("bcryptjs");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
const config = require("../../config")

exports.register = function(req, res) {
  const salt = bcrypt.genSaltSync(10);
  let data = req.body;
  data.password = bcrypt.hashSync(data.password, salt);
  userModel.register(data, (error, databack) => {
    if (error) throw error;
    res.json(databack);
  });
};

exports.login = function(req, res) {
  userModel.getUserByUsername(req.body, (error, data) => {
    if (error) throw error;

    if (data.length == 0) {
      res.status(401).send({ message: "ไม่มีชื่อผู้ใช้นี้ในระบบ" });
    } else {
      var user = data[0];

      bcrypt.compare(req.body.password, user.password, function(err, match) {
        if(err){
          console.log(err)
          res.status(400).send("there some internal error")
        }
        if (match) {
          const token = jwt.sign({ username: user.username }, config.secret);
          res.json({ token: token });
        } else {
          res.status(401).send({ message: "รหัสผ่านไม่ถูกต้อง" });
        }
      });
    }
  });
};

exports.verifyToken = function(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token, { complete: true });
    if (decoded) {
      let same = (decoded.payload.username == req.body.username);
      if (same) {
        userModel.getUserByUsername(decoded.payload, function(
          error,
          data
        ) {
          if (error) throw error;
          if (data.length != 0) {
            res.status(200).send({message: "ยืนยันผู้ใช้ถูกต้อง"})
            return next();
          } else {
            res.status(401).send("ชื่อผู้ใช้ไม่มีอยู่จริง");
          }
        });
      }
    } else {
      res.status(401).send("Invalid token");
    }
  } else {
    res.status(401).send("Cannot get header");
  }
};

exports.updateUser = function(req, res) {
  let data = req.body;
  userModel.updateUser(req.params.username, data, (error, databack) => {
    if (error) throw error;
    res.json(databack);
  });
};

exports.forgotPassword = function(req, res) {
  let data = req.body;
  userModel.forgotPassword(data, (error, databack) => {
    if (error) throw error;
    res.json(databack);
  });
};

exports.verifyPw = function(req, res) {
  let pw = req.body.password;
  userModel.verifyPw(req.params.username, (error, databack) => {
    if (error) throw error;
    else {
      if (pw == databack) res.json("Update Successfully");
      else {
        res.json("Password is incorrect");
      }
    }
  });
};
