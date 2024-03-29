var express = require('express');
const app = express();
app.use(express.static("public"));

var https = require('https');

var url = require('url');
var bodyParser = require('body-parser');
var path = require('path');
var nodemailer = require('nodemailer');

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
      user: 'aiclubatuva@gmail.com',
      pass: 'brownchickenbrowncow'
    }
  });

  var mailOptions = {
    to: 'aiclubatuva@gmail.com',
    subject: 'Message from '+name,
    text: 'Message: '+mess+" contact at "+emailId+" or "+phone
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
        res.send({status: success});
    }
  });
});

app.post('/sponsor', function (req, res) {
    console.log("what up what up what up");
    var name = req.body.nameS;
    var email = req.body.emailS;
    var cName = req.body.cNameS;

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'aiclubatuva@gmail.com',
            pass: 'brownchickenbrowncow'
        }
    });

    var mailOptions = {
        to: 'aiclubatuva@gmail.com',
        subject: 'Sponsor Alert! From ' + name,
        text: 'Contact email: ' + email + ", Contact Name (optional): " + cName + ", Company: " + name
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            res.send({ status: "success" });
        }
    });
});
app.get('/', function(req, res) {
  console.log("Hello World");
  res.sendFile(path.resolve("./index.html"));
});
