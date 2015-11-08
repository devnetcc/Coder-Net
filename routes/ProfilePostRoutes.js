var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ProfilePost = mongoose.model('ProfilePost');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: "payload", //req.payload._id in the Route
  secret: "CoderCamps" //matches the secret in model
});

router.post('/:userID', function(req, res, next) {
  var post = new ProfilePost(req.body);
  post.date = new Date();
  post.save(function(err, result) {
    if(err) return next(err);
    if(!result) return next("Could not Create Post");
    res.send(result);
  });
});

router.get('/:id', function(req, res, next){
  ProfilePost.find({createdBy: req.params.id}, function(err, result){
    if(err) {return next(err);}
    if(!result) {return next({err: "Error finding post by that user ID"});}
    res.send(result);
  });
});

router.get('/', function(req, res, next){
  ProfilePost.find({}, function(err, result){
    if(err) {return next(err);}
    if(!result) {return next({err: "Error finding post by that user ID"});}
    res.send(result);
  });
});



router.delete('/:id', function(req, res, next) {
  ProfilePost.remove({_id: req.params.id}, function(err, result) {
      if(err) return next(err);
      res.send();
  });
});


module.exports = router;
