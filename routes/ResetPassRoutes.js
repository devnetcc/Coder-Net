var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var mongoose = require('mongoose');
var User = mongoose.model("User");
var wellknown = require('nodemailer-wellknown');
var nodemailer = require('nodemailer');
var jwt = require("jsonwebtoken");
// var LocalStrategy = require('passport-local').Strategy;
// var bcrypt = require('bcrypt-nodejs');
// var async = require('async');
// var crypto = require('crypto');
// var passport = require('passport');
// var session = require('express-session');


// ---------------------------------------------------
// Kareem Group code below. Not working
// ---------------------------------------------------
// create reusable transporter object using SMTP transport
// var transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//         user: 'dojadeveloper@gmail.com',
//         pass: ''
//     }
// });
//
// function SendEmail(user, resObj) {
//   var date = new Date().getTime();
//   var fiveMins = 1000 * 600;
//   date += fiveMins;
//   resetPassToken = jwt.sign({
//     expirationDate: date,
//     user: {
//       id: user._id,
//       name: user.name
//     }
//   }, passwordSecret);
//   var name = user.name;
//   var linkbase = 'http://localhost:3000/';
//   var link = linkbase + '#/reset/' + resetPassToken;
//   var text = "<h2>Hello, " + name + "!<br><br>You recently requested to have your password reset. If you received this in error, ignore this message it will expire. Otherwise, click <a href='" + link + "'>here</a> to begin the process......... you have 10 minutes. Let the games begin.</h2>" +
//     "<br><br>" +
//     "<p>Sincerely,</p>" + "<p>DevNet Team</p>";
//   var mailOptions = {
//     from: 'DevNet Admins  <no-reply@DevNet.com>', // sender address
//     to: user.email, // list of receivers
//     subject: 'Password Reset', // Subject line
//     // text: 'Hello world', // plaintext body
//     html: text // html body
//   }
//   transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//       return resObj.status(500).send({
//         err: "Error sending email"
//       })
//     }
//     return resObj.send()
//   });
// }

// ---------------------------------------------------
// GitHub code below. works but need linked. I believe all dependencies have been added
// ---------------------------------------------------
//  THIS CODE WORKS AUTOMATICALLY TO SEND EMAIL ONCE TRANSPORTER USER & PASS ARE VALID
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'dojadeveloper@gmail.com',
        pass: ''
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols
var mailOptions = {
    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
    to: 'micdoja@yahoo.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ✔', // plaintext body
    html: '<b>Hello world ✔</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);

});



module.exports = router;
