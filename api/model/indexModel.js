const pool = require("../../pool");

exports.register = function(data, callback) {
  let now = new Date();
  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query(
      "select username from user where username = $1",
      data.username
    ),
      function(err, result, fields) {
        if (err) callback(err, null);
        else if (result != null) {
          callback(null, result);
        } else {
          // connection.query("insert into users values ('" +
          //     data.username +
          //     "','" +
          //     data.password +
          //     "','" +
          //     data.fname +
          //     "','" +
          //     data.lname +
          //     "','" +
          //     data.email +
          //     "','" +
          //     data.profilePicture +
          //     "','" +
          //     data.address +
          //     "','" +
          //     now.getFullYear()+"/"+now.getMonth()+"/"+"/"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds() +
          //     "');", function (err, result, fields) {
          //         if (err) callback(err,null);
          //         console.log(result);
          //     });
          connection.query(
            "insert into user values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
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
              now.getSeconds(),
            function(err, result, fields) {
              if (err) callback(err, null);
              console.log(result);
            }
          );
        }
      };
  });
};