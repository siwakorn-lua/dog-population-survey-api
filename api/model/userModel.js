const pool = require("../../pool");

exports.updateUser = function(username, data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null); // not connected!

    // Use the connection
    connection.query(
      "update user set firstName = ?, lastName = ?, address = ?, subdistrict = ?," +
        " district = ?, province = ? where username = ?",
      [
        data.firstName,
        data.lastName,
        data.address,
        data.subdistrict,
        data.district,
        data.province,
        username
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

exports.register = function(data, callback) {
  let now = new Date();
  pool.getConnection(function(err, connection) {
    connection.query(
      "select * from user where username = ?",
      [data.username],
      function(err, result, fields) {
        if (err) throw err;
        else if (result.length != 0) {
          callback(null, result);
        } else {
          connection.query(
            "insert into user values (?,?,?,?,?,?,?,?,?,?)",
            [
              data.username,
              data.password,
              data.firstName,
              data.lastName,
              data.address,
              data.subdistrict,
              data.district,
              data.province,
              data.profilePicture,
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
              connection.release()
              callback(null, result);
            }
          );
        }
      }
    );
  });
};
