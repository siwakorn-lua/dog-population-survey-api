var express = require('express')
var logger = require('morgan')
var bodyParser = require('body-parser')
var app = express()
var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'doggy',
  insecureAuth: true
})
connection.connect()

var nodemailer = require('nodemailer')
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'email',
    pass: 'password'
  }
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/register', function(req, res) {
  let body = req.body
  let now = new Date()
  connection.query(
    "insert into users values ('" +
      body.username +
      "','" +
      body.password +
      "','" +
      body.fname +
      "','" +
      body.lname +
      "','" +
      body.email +
      "','" +
      body.profilePicture +
      "','" +
      body.address +
      "','" +
      now.getFullYear() +
      '/' +
      now.getMonth() +
      '/' +
      '/' +
      now.getDate() +
      ' ' +
      now.getHours() +
      ':' +
      now.getMinutes() +
      ':' +
      now.getSeconds() +
      "');",
    function(err, result, fields) {
      if (err) throw err
      console.log(result)
    }
  )
})

app.post('/login', function(req, res) {
  // do something here
})

app.post('/forgot', function(req, res) {
  //input
  let body = req.body
  connection.query(
    'select username,password from user where email = ?',
    [body.email],
    function(err, result, field) {
      console.log('password is ' + result[0].password)
      let mailOptions = {
        from: 'non-reply.Doggiesapp@gmail.com',
        to: body.email,
        subject: 'Forget Password Doggies Application',
        html:
          '<b>Do you forget password?</b><br/> Your account : ' +
          result[0].username +
          ' <br/>password : ' +
          result[0].password +
          '<br/><br/>Doggies Application Authorization'
      }
      transporter.sendMail(mailOptions, function(err, info) {
        if (err) console.log(err)
        else console.log(info)
      })
    }
  )
})

app.post('/user/update', function(req, res) {
  // finished
})

app.post('/dog/add', function(req, res) {
  // finished
})

app.post('/dog/update', function(req, res) {
  // do something here
})

app.post('/dog/syn', function(req, res) {
  // do something here
})

app.post('/report', function(req, res) {
  // do something here
})

app.post('/report/request', function(req, res) {
  // do something here
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
