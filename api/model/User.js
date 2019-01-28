const connection = require("../../pool");

exports.register = function(data, callback) {
  let now = new Date();
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
            callback(null, result);
          }
        );
      }
    }
  );
};
