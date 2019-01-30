const pool = require("../../pool");

exports.addDog = function(data, callback) {
  let now = new Date();
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null); // not connected!
    // Use the connection
    connection.query(
      "insert into dog(dogName,dogType,age,ageRange,birthDate,breed,gender,color,sterilized,address,subdistrict,district,province,gps,remark,owner,submitDate) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.dogName,
        data.dogType,
        data.age,
        data.ageRange,
        data.birthDate,
        data.breed,
        data.gender,
        data.color,
        data.sterilized,
        data.address,
        data.subdistrict,
        data.district,
        data.province,
        data.gps,
        data.remark,
        data.username,
        now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay()
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

exports.updateDog = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null); // not connected!
    let now = new Date();
    // Use the connection
    connection.query(
      "update dog set dogName = ?, dogType = ?, age = ?, ageRange = ?, birthDate = ?, breed = ?," +
        " gender = ?, color = ?, sterilized = ?, address = ?, subdistrict = ?, district = ?," +
        " province = ?, gps = ?, remark = ?, submitDate = ? where dogID = ?",
      [
        data.dogName,
        data.dogType,
        data.age,
        data.ageRange,
        data.birthDate,
        data.breed,
        data.gender,
        data.color,
        data.sterilized,
        data.address,
        data.subdistrict,
        data.district,
        data.province,
        data.gps,
        data.remark,
        now.getFullYear() + "-" + now.getMonth() + "-" + now.getDay(),
        data.dogID
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
