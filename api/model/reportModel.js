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

exports.countDogByProvince = function(callback) {
    pool.getConnection(function(err, connection) {
      if (err) callback(err, null); // not connected!  
      // Use the connection
      connection.query(
        "SELECT count(*),province FROM dog group by province",
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

  