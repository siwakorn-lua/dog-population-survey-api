const pool = require("../../pool");
const bcrypt = require("bcryptjs");
const AWS = require("aws-sdk");
const fs = require("fs");

// Set-up s3
const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;
AWS.config.update({ region: "ap-southeast-1" });
s3 = new AWS.S3();

exports.getUserByUsername = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    connection.query(
      "SELECT * FROM user where username = ?",
      [data.username],
      function(error, results, fields) {
        connection.release();
        if (error) callback(error, null);
        else {
          callback(null, results);
        }
      }
    );
  });
};

exports.register = function(data, files, callback) {
  let now = new Date();
  if (files.profilePicture) {
    var keyName = "uploads/" + data.username + "/user-profile.jpg";
    var fileStream = fs.createReadStream(files.profilePicture.path);
    fileStream.on("error", function(err) {
      console.log("File Error", err);
      callback(err, "Your file is invalid");
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
        callback(err, null);
      }
      pool.getConnection(function(err, connection) {
        if (err) callback(err, null);
        connection.query(
          "select * from user where username = ?",
          [data.username],
          function(err, result, fields) {
            if (err) throw err;
            else if (result.length != 0) {
              callback("Already have this username.", null);
            } else {
              connection.query(
                "insert into user(username,email,password,firstName,lastName,address,subdistrict,district,province,phone,profilePicture,forgotQuestion,forgotAnswer,registerDate,latestUpdate) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
                [
                  data.username,
                  data.email ? data.email : null,
                  data.password,
                  data.firstName,
                  data.lastName,
                  data.address ? data.address : null,
                  data.subdistrict ? data.subdistrict : null,
                  data.district ? data.district : null,
                  data.province ? data.province : null,
                  data.phone ? data.phone : null,
                  imgData.Location,
                  data.forgotQuestion,
                  data.forgotAnswer,
                  now.getFullYear() +
                    "/" +
                    now.getMonth() +
                    "/" +
                    "/" +
                    now.getDate() +
                    " " +
                    now.getHours() +
                    ":" +
                    now.getMinutes() +
                    ":" +
                    now.getSeconds(),
                  now.getFullYear() +
                    "/" +
                    now.getMonth() +
                    "/" +
                    "/" +
                    now.getDate() +
                    " " +
                    now.getHours() +
                    ":" +
                    now.getMinutes() +
                    ":" +
                    now.getSeconds()
                ],
                function(err, result, fields) {
                  if (err) callback(err, null);
                  connection.release();
                  console.log(result);
                  callback(null, result);
                }
              );
            }
          }
        );
      });
    });
  } else {
    pool.getConnection(function(err, connection) {
      if (err) callback(err, null);
      connection.query(
        "select * from user where username = ?",
        [data.username],
        function(err, result, fields) {
          if (err) throw err;
          else if (result.length != 0) {
            callback(null, "Already have this username.");
          } else {
            connection.query(
              "insert into user(username,email,password,firstName,lastName,address,subdistrict,district,province,phone,profilePicture,forgotQuestion,forgotAnswer,registerDate,latestUpdate) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
              [
                data.username,
                data.email ? data.email : null,
                data.password,
                data.firstName,
                data.lastName,
                data.address ? data.address : null,
                data.subdistrict ? data.subdistrict : null,
                data.district ? data.district : null,
                data.province ? data.province : null,
                data.phone ? data.phone : null,
                null,
                data.forgotQuestion,
                data.forgotAnswer,
                now.getFullYear() +
                  "/" +
                  now.getMonth() +
                  "/" +
                  "/" +
                  now.getDate() +
                  " " +
                  now.getHours() +
                  ":" +
                  now.getMinutes() +
                  ":" +
                  now.getSeconds(),
                now.getFullYear() +
                  "/" +
                  now.getMonth() +
                  "/" +
                  "/" +
                  now.getDate() +
                  " " +
                  now.getHours() +
                  ":" +
                  now.getMinutes() +
                  ":" +
                  now.getSeconds()
              ],
              function(err, result, fields) {
                if (err) callback(err, null);
                connection.release();
                callback(null, result);
              }
            );
          }
        }
      );
    });
  }
};

exports.updateUser = function(data, files, callback) {
  let now = new Date();
  if (files.profilePicture) {
    var keyName = "uploads/" + data.username + "/user-profile.jpg";
    var fileStream = fs.createReadStream(files.profilePicture.path);
    fileStream.on("error", function(err) {
      console.log("File Error", err);
      callback(err, "Your file is invalid");
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
        callback(err, null);
      }
      pool.getConnection(function(err, connection) {
        if (err) callback(err, null);
        connection.query(
          "update user set firstName = ?, lastName = ?, address = ?, subdistrict = ?, district = ?, province = ?, phone = ?, email = ?, profilePicture = ?, forgotQuestion = ?, forgotAnswer = ?, latestUpdate = ? where username = ?",
          [
            data.firstName,
            data.lastName,
            data.address ? data.address : null,
            data.subdistrict ? data.subdistrict : null,
            data.district ? data.district : null,
            data.province ? data.province : null,
            data.phone ? data.phone : null,
            data.email ? data.email : null,
            imgData.Location,
            data.forgotQuestion,
            data.forgotAnswer,
            now.getFullYear() +
              "/" +
              now.getMonth() +
              "/" +
              "/" +
              now.getDate() +
              " " +
              now.getHours() +
              ":" +
              now.getMinutes() +
              ":" +
              now.getSeconds(),
            data.username
          ],
          function(err, result, fields) {
            connection.release();
            fs.unlink(files.profilePicture.path, err => {
              if (err) console.log(err);
            });
            if (err) callback(err, null);
            else {
              callback(null, result);
            }
          }
        );
      });
    });
  } else {
    pool.getConnection(function(err, connection) {
      if (err) callback(err, null);
      connection.query(
        "update user set firstName = ?, lastName = ?, address = ?, subdistrict = ?, district = ?, province = ?, phone = ?, email = ?, profilePicture = ?, forgotQuestion = ?, forgotAnswer = ?, latestUpdate = ? where username = ?",
        [
          data.firstName,
          data.lastName,
          data.address ? data.address : null,
          data.subdistrict ? data.subdistrict : null,
          data.district ? data.district : null,
          data.province ? data.province : null,
          data.phone ? data.phone : null,
          data.email ? data.email : null,
          null,
          data.forgotQuestion,
          data.forgotAnswer,
          now.getFullYear() +
            "/" +
            now.getMonth() +
            "/" +
            "/" +
            now.getDate() +
            " " +
            now.getHours() +
            ":" +
            now.getMinutes() +
            ":" +
            now.getSeconds(),
          data.username
        ],
        function(err, result, fields) {
          connection.release();
          if (err) callback(err, null);
          else {
            callback(null, result);
          }
        }
      );
    });
  }
};

// Assume there will be a question for those who forgot their password
exports.forgotPassword = function(data, files, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    connection.query(
      "select forgotQuestion,forgotAnswer from user where username = ?",
      [data.username],
      function(err, result, field) {
        if (err) callback(err, null);
        if (result.length == 0) callback("Username cannot be found.", null);
        else {
          if (
            data.forgotQuestion == result[0].forgotQuestion &&
            data.forgotAnswer == result[0].forgotAnswer
          ) {
            let salt = bcrypt.genSaltSync(10);
            let encryptedPassword = bcrypt.hashSync(data.password, salt);
            connection.query(
              "update user set password = ? where username = ?",
              [encryptedPassword, data.username],
              function(err, results, fields) {
                if (err) callback(err, null);
                connection.release();
                callback(null, results);
              }
            );
          } else {
            callback("Your security question or answer is wrong.", null);
          }
        }
      }
    );
  });
};

exports.forgotPasswordForce = function(data, files, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    let salt = bcrypt.genSaltSync(10);
    let encryptedPassword = bcrypt.hashSync(data.password, salt);
    connection.query(
      "update user set password = ? where username = ?",
      [encryptedPassword, data.username],
      function(err, results, fields) {
        connection.release();
        if (err) {
          callback(err, null);
        } else {
          if (results.affectedRows == 0) {
            callback("This username doesn't exist");
          } else {
            callback(null, results);
          }
        }
      }
    );
  });
};
