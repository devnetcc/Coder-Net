var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ForumPost = mongoose.model('ForumPost');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: "payload", //req.payload._id in the Route
  secret: "Coder Camps" //matches the secret in model
});






module.exports = router;
