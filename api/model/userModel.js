const pool = require("../../pool");
const bcrypt = require("bcryptjs");

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
        data.email,
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
      "SELECT * FROM user where email = ?",
      [data.email],
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

exports.register = function(data, callback) {
  let now = new Date();
  pool.getConnection(function(err, connection) {
    connection.query(
      "select * from user where email = ?",
      [data.email],
      function(err, result, fields) {
        if (err) throw err;
        else if (result.length != 0) {
          callback(null, result);
        } else {
          connection.query(
            "insert into user(email,password,firstName,lastName,address,subdistrict,district,province,phone,profilePicture,forgotQuestion,forgotAnswer,registerDate) values (?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              data.email,
              data.password,
              data.firstName,
              data.lastName,
              data.address,
              data.subdistrict,
              data.district,
              data.province,
              data.phone,
              data.profilePicture,
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
};

// Assume there will be a question for those who forgot their password
exports.forgotPassword = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    connection.query(
      "select questionTopic,questionAnswer from user where email = ?",
      [data.email],
      function(err, result, field) {
        if (err) callback(err, null);
        if (
          data.questionTopic == result[0].questionTopic &&
          data.questionAnswer == result[0].questionAnswer
        ) {
          let salt = bcrypt.genSaltSync(10);
          let encryptedPassword = bcrypt.hashSync(data.password, salt);
          connection.query(
            "update user set password = ? where email = ?",
            [encryptedPassword, data.email],
            function(err, results, fields) {
              if (err) callback(err, null);
              connection.release();
              callback(null, results);
            }
          );
        }
      }
    );
  });
};
