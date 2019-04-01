const pool = require("../../pool");

exports.addDog = function(data, callback) {
  let now = new Date();
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    connection.query(
      "insert into dog(dogType,gender,color,name,breed,age,ageRange,address,subdistrict,district,province,latitude,longitude,registerDate,latestUpdate,ownerID) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.dogType,
        data.gender,
        data.color ? data.color : null,
        data.name ? data.name : null,
        data.breed ? data.breed : null,
        data.age ? data.age : null,
        data.ageRange,
        data.address,
        data.subdistrict,
        data.district,
        data.province,
        data.latitude,
        data.longitude,
        now,
        now,
        data.ownerID
      ],
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

exports.updateDog = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    let now = new Date();
    connection.query(
      "update dog set dogType = ?, gender = ?, color = ?, name = ?, breed = ?," +
        " age = ?, ageRange = ?, address = ?, subdistrict = ?, district = ?," +
        " province = ?, latitude = ?, longitude = ?, latestUpdate = ? where dogID = ?",
      [
        data.dogType,
        data.gender,
        data.color ? data.color : null,
        data.name ? data.name : null,
        data.breed ? data.breed : null,
        data.age ? data.age : null,
        data.ageRange,
        data.address,
        data.subdistrict,
        data.district,
        data.province,
        data.latitude,
        data.longitude,
        now,
        data.dogID
      ],
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
