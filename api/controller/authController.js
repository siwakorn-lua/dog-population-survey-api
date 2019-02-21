const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

exports.verifyToken = function(req, res, next) {
  if (req.headers.authorization) {
    const token = req.headers.authorization;
    const decoded = jwt.decode(token, { complete: true });
    if (decoded) {
      let same = decoded.payload.username == req.body.username;
      if (same) {
        userModel.getUserByUsername(decoded.payload, function(error, data) {
          if (error) throw error;
          if (data.length != 0) {
            return next();
          } else {
            res.status(401).send({ message: "ชื่อผู้ใช้ไม่มีอยู่จริง" });
          }
        });
      }
    } else {
      res.status(401).send({ message: "Invalid token" });
    }
  } else {
    res.status(401).send({ message: "Cannot get header" });
  }
};
