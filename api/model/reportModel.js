exports.countAllDog = function(data, callback) {
    pool.getConnection(function(err, connection) {
      if (err) callback(err, null); // not connected!  
      // Use the connection
      connection.query(
        "SELECT count(*) FROM dog",
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
        "SELECT count(*) FROM dog where province = ?",[province],
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

  