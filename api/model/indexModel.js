const pool = require('../../pool');

exports.register = function(data, callback) {

    let now = new Date();   
    pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query("select username from users where username = $1",data.username),
            function(err,result,fields){
                if (err) callback(err,null);
                else if(result != null){
                    callback(null,result);
                }
                else{
                    connection.query("insert into users values ('" +
                        data.username +
                        "','" +
                        data.password +
                        "','" +
                        data.fname +
                        "','" +
                        data.lname +
                        "','" +
                        data.email +
                        "','" +
                        data.profilePicture +
                        "','" +
                        data.address +
                        "','" +
                        now.getFullYear()+"/"+now.getMonth()+"/"+"/"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds() +
                        "');", function (err, result, fields) {
                            if (err) callback(err,null);
                            console.log(result);
                        });
                }
            }        
      });
};



