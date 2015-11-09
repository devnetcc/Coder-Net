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

router.param('id', function(req,res,next,id){
  // console.log(id);
  Comment.findOne({_id: id}, function(err,result){
    if(err) return next(err);
    if(!result) return next({err: "couldnt find it"});
    req.fpost = result;
    next();
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


router.get('/:id', function(req, res, next) {
  // console.log(res.body);
  Comment.find({forum:}, function(err , result) {
    if(err) return next (err);
    if(!result) return next(err);
  });
  res.send();
});



module.exports = router;
