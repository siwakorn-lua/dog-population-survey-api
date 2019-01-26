var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
 
app.post('/test', function(req, res) {
  res.json({notes: "this is only test api"})
})
 
app.listen(3000, () => {
    console.log("Server is running on port 3000")
}

)