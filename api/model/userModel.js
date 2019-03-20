const pool = require("../../pool");
const bcrypt = require("bcryptjs");
const AWS = require("aws-sdk");
const fs = require("fs");

// Set-up s3
const credentials = new AWS.SharedIniFileCredentials({ profile: "default" });
AWS.config.credentials = credentials;
AWS.config.update({ region: "ap-southeast-1" });
s3 = new AWS.S3();

exports.updateUser = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null); // not connected!

    // Use the connection
    connection.query(
      "update user set firstName = ?, lastName = ?, address = ?, subdistrict = ?," +
        " district = ?, province = ?, phone = ?, lineID = ?, facebookID = ?, googleID = ? where email = ?",
      [
        data.firstName,
        data.lastName,
        data.address,
        data.subdistrict,
        data.district,
        data.province,
        data.phone,
        data.lineID,
        data.facebookID,
        data.googleID,
        data.email
      ],
      function(error, results, fields) {
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) callback(error, null);
        else {
          callback(null, results);
        }

        // Don't use the connection here, it has been returned to the pool.
      }
    );
  });
};

exports.getUserByUsername = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null); // not connected!
    // Use the connection
    connection.query(
      "SELECT * FROM user where username = ?",
      [data.username],
      function(error, results, fields) {
        // When done with the connection, release it.
        connection.release();

        // Handle error after the release.
        if (error) callback(error, null);
        else {
          callback(null, results);
        }
        // Don't use the connection here, it has been returned to the pool.
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
              callback(null, result);
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
            callback(null, result);
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
