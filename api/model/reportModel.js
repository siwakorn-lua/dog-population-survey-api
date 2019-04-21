const pool = require("../../pool");

exports.countDogByRegion = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null); // not connected!
    // Use the connection
    connection.query(
      "SELECT province, dogType, count(dogType) AS total FROM dog GROUP BY province, dogType",
      function(error, results, fields) {
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) callback(error, null);
        else {
          callback(null, results);
        }
      }
    );
  });
};

exports.countAllDog = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null); // not connected!
    // Use the connection
    connection.query(
      "SELECT dogType, COUNT(*) AS num FROM dog GROUP BY dogType",
      function(error, results, fields) {
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) callback(error, null);
        else {
          callback(null, results);
        }
      }
    );
  });
};

exports.countDogByProvince = function(province, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null); // not connected!
    // Use the connection
    connection.query(
      "SELECT dogType, COUNT(*) AS num FROM dog WHERE province = ? GROUP BY dogType",
      [province],
      function(error, results, fields) {
        // When done with the connection, release it.
        connection.release();
        // Handle error after the release.
        if (error) callback(error, null);
        else {
          callback(null, results);
        }
      }
    );
  });
};

exports.getAllUsers = function(callback) {
  console.log("generaing all user report")
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    connection.query("select * from user", function(error, results, fields) {
      connection.release();
      if (error) callback(error, null);
      else {
        callback(null, results);
      }
    });
  });
};

exports.getAllDogInformations = function(callback) {
  console.log("generaing all dog report")
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    connection.query("select dog.dogID, case dog.dogType when 1 then \"Indoor\" when 2 then \"Outdoor\" when 3 then \"Stray\" end as dogType, dog.gender, dog.color, dog.name, dog_information.age, case dog_information.ageRange when 1 then \"Puppy\" when 2 then \"Adult\" end as ageRange, case dog_information.dogStatus when 1 then \"Alive\" when 2 then \"Missing\" when 3 then \"Dead\" end as dogStatus, pregnant, childNumber, deathRemark, missingDate, case sterilized when 0 then \"No\" when 1 then \"Yes\" end as sterilized, sterilizedDate, dog.address, dog.subdistrict, dog.district, dog.province, dog.latitude, dog.longitude, dog.registerDate, dog.latestUpdate, dog.ownerID from dog join dog_information on dog.dogID = dog_information.dogID", function(error, results, fields) {
      connection.release();
      if (error) callback(error, null);
      else {
        callback(null, results);
      }
    });
  });
};

exports.getDogImages = function(callback) {
  console.log("generaing dog image report")
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    connection.query("select dogID, case side when 1 then \"Front\" when 2 then \"Side\" end as side, picture from dog_picture", function(error, results, fields) {
      connection.release();
      if (error) callback(error, null);
      else {
        callback(null, results);
      }
    });
  });
};

exports.getDogVaccines = function(callback) {
  console.log("generaing dog vaccine report")
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null);
    connection.query("select * from dog_vaccine", function(error, results, fields) {
      connection.release();
      if (error) callback(error, null);
      else {
        callback(null, results);
      }
    });
  });
};