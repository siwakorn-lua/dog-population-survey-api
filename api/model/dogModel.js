const pool = require("../../pool");

exports.addDog = function(data, callback) {
    pool.getConnection(function(err, connection) {
      if (err) callback(err, null); // not connected!
  
      // Use the connection
      connection.query(
        "insert into dog values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        [
          data.dogName,
          data.age,
          data,
          ageRange,
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
          data.indoorFlag,
          data.outdoorFlag,
          data,
          strayFlag,
          data.owner,
          data.submitDate
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
  
      // Use the connection
      connection.query(
        "update dog set dogName = ?, age = ?, ageRange = ?, birthDate = ?, breed = ?," +
          " gender = ?, color = ?, sterilized = ?, address = ?, subdistrict = ?, district = ?," +
          " province = ?, gps = ?, remark = ?, indoorFlag = ?, outdoorFlag = ?," +
          " strayFlag = ?, owner = ?, submitDate = ?",
        [
          data.dogName,
          data.age,
          data,
          ageRange,
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
          data.indoorFlag,
          data.outdoorFlag,
          data,
          strayFlag,
          data.owner,
          data.submitDate
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