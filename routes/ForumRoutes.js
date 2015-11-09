var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ForumPost = mongoose.model('ForumPost');
var Comment = mongoose.model('Comment');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: "payload", //req.payload._id in the Route
  secret: "CoderCamps" //matches the secret in model
});

router.param('id', function(req,res,next,id){
  // console.log(id);
  ForumPost.findOne({_id: id}, function(err,result){
    if(err) return next(err);
    if(!result) return next({err: "couldnt find it"});
    req.fpost = result;
    next();
  });
});


router.post('/',auth, function(req,res,next){
  console.log(req.body);
  var post = new ForumPost(req.body);
  post.createdBy = req.payload;
  User.findOne({email: req.payload.email}, function(err,result){
          if(err) return next(err);
          console.log(result," result is...");
      if(!result) return next({err: "Couldnt find a user with that id"});
      result.update({$push:{forumPosts: post}},
        function(err,result){
               if(err) return next(err);
               if(!result) return next({err: "Couldnt find a user with that id"});
            });
          post.save(function(err,result){
            if(err) return next(err);
          if(!result) return next({err: "Couldnt find a user with that id"});
          });
        });
        res.send();
});

//show all post on the forum page
router.get('/', function(req,res,next){
  ForumPost.find({}, function(err,result){
    if(err) return next(err);
    console.log(result);
    res.send(result);
  });
});

//show a particular forum post on a single page
router.get('/:id', function(req,res,next){
  ForumPost.findOne({_id: req.params.id}, function(err, result) {
    if(err) return next(err);
    if(!result) return next("Could not find that post");
    res.send(result);
  });
});

//show the forum post's data on the edit page
router.get('/edit/:id', function(req,res,next){
  ForumPost.findOne({_id: req.params.id}, function(err, result) {
    if(err) return next(err);
    if(!result) return next("Could not find that post");
    res.send(result);
  });
});

//find a particular book and update it
router.put('/edit/:id', auth,function(req,res,next){
ForumPost.update({_id: req.params.id},req.body,
  function(err,result){
  if(err) return next(err);
  if(!result) return next("Could not create the object. Please check all fields.");
  res.send(result);
});
});

//Delete a forum post by it's id
router.delete('/:id', function(req,res,next){
  // console.log("I made it to the route file");
  ForumPost.remove({_id: req.params.id}, function(err,result){
    if(err) return next(err);
  res.send();
});
});

router.post('/:id', auth , function(req, res, next) {
  console.log(req);
  var comment = new Comment(req.body);
  comment.createdBy = req.payload._id;
  comment.date = new Date();
  comment.save(function(err,result){
    if(err) return next(err);
  if(!result) return next({err: "Couldn't find a comment with that id"});
  });
res.send();
});

router.get('/:id', auth, function(req, res, next) {
  // console.log(req);
  Comment.find({id: req.params.id}, function(err , result) {
    if(err) return next (err);
    if(!result) return next(err);
  });
  res.send();
});






module.exports = router;
