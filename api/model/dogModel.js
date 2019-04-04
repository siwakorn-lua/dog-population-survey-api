const pool = require("../../pool");
const moment = require("moment");

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

exports.addDogInformation = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    let now = new Date();
    connection.query(
      "insert into dog_information(dogID, submitDate, dogStatus, ageRange, age, pregnant, childNumber, deathRemark, missingDate, sterilized, sterilizedDate) values (?,?,?,?,?,?,?,?,?,?,?)",
      [
        data.dogID,
        now,
        data.dogStatus,
        data.ageRange,
        data.age ? data.age : null,
        data.pregnant ? data.pregnant : null,
        data.childNumber ? data.childNumber : null,
        data.deathRemark ? data.deathRemark : null,
        data.missingDate
          ? moment(data.missingDate, "DD/MM/YYYY").format("YYYYMMDD")
          : null,
        data.sterilized ? data.sterilized : null,
        data.sterilizedDate
          ? moment(data.sterilizedDate, "DD/MM/YYYY").format("YYYYMMDD")
          : null
      ],
      function(err, results, fields) {
        connection.release();
        if (err) callback(err, null);
        else {
          callback(null, results);
        }
      }
    );
  });
};

exports.addDogVaccine = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    connection.query(
      "insert into dog_vaccine(dogID,vaccineName,injectedDate) values (?,?,?)",
      [
        data.dogID,
        data.vaccineName,
        moment(data.injectedDate, "DD/MM/YYYY").format("YYYYMMDD")
      ],
      function(err, results, fields) {
        connection.release();
        if (err) callback(err, null);
        else {
          callback(null, results);
        }
      }
    );
  });
};

exports.addDogImage = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    connection.query(
      "select * from dog_picture where dogID = ? and side = ?",
      [data.dogID, data.side],
      function(error, result, fields) {
        if (error) callback(error, null);
        else {
          if (result.length != 0) {
            connection.query(
              "update dog_picture set picture = ? where dogID = ? and side = ?",
              [data.imageLocation, data.dogID, data.side],
              function(error, result, fields) {
                if (error) callback(error, null);
                else {
                  callback(null, result);
                }
              }
            );
          } else {
            connection.query(
              "insert into dog_picture(dogID,side,picture) values (?,?,?)",
              [data.dogID, data.side, data.imageLocation],
              function(error, result, fields) {
                if (error) callback(error, null);
                else {
                  callback(null, result);
                }
              }
            );
          }
        }
      }
    );
  });
};
