var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Comment = mongoose.model('Comment');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: "payload", //req.payload._id in the Route
  secret: "CoderCamps" //matches the secret in model
});

router.param('ForumId', function(req,res,next,ForumId){
  ForumPost.findOne({_id: ForumId}, function(err,result){
    if(err) return next(err);
    if(!result) return next({err: "Couldnt find it"});
    req.fpost = result;
    next();
  });
});

router.post('/:id', auth , function(req, res, next) {
  var comment = new Comment(req.body);
  comment.forumPost = req.params.id;
  comment.createdBy = req.payload;
  comment.date = new Date();
  comment.save(function(err,result){
    if(err) return next(err);
  if(!result) return next({err: "Couldn't find a comment with that id"});
  User.findOne({email: req.payload.email}, function(err, user){
    if(!user) return res.status(404).send({err: "Could not find that user."});
  user.comments.push(result);
  user.save(function(err, user) {
  });
  res.send();
  });
  });
  });

router.get('/:id', function(req, res, next) {
  Comment.find({}, function(err , result) {
    if(err) return next (err);
    if(!result) return next(err);
    console.log(result);

    res.send(result);
  });
});





// router.post('/', auth, function(req, res, next) {
//   console.log(comment);
//   var comment = new Comment(req.body);
//   console.log(comment);
//   comment.createdBy = req.payload._id;
//   comment.date = new Date();
//   comment.save(function(err,result){
//     if(err) return next(err);
//   if(!result) return next({err: "Couldn't find a comment with that id"});
//   });
// res.send();
// });


// router.get('/', function(req, res, next) {
//   console.log(req);
//   Comment.find({}, function(err , result) {
//     if(err) return next (err);
//     if(!result) return next(err);
//   });
//   res.send();
// });



module.exports = router;
