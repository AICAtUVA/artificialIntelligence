var express = require('express');
var app = express();

var https = require('https');
var http = require('http').Server(mess);

var url = require('url');
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'brownchickenbrowncow',
  database: 'safewalktest'
});

app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
  })
);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});

app.post('/email', function(req, res) {
  var name = req.body.name;
  var phone = req.body.phone;
  var emailId = req.body.email;
  var mess = req.body.message;
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'youremail@gmail.com',
      pass: 'yourpassword'
    }
  });

  var mailOptions = {
    to: 'myfriend@yahoo.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
});
