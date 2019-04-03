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

exports.reportCsv = function(data, callback) {
  pool.getConnection(function(err, connection) {
    if (err) callback(err, null); // not connected!
    // Use the connection
    connection.query(
      "select * from dog left join dog_information on dog.dogID = dog_information.dogID " + 
      "where submitDate in (select max(submitDate) from dog_information group by dogID)",
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

