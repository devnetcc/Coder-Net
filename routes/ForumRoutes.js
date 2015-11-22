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

router.param('id', function(req, res, next, id){
  ForumPost.findOne({_id: id}, function(err,result){
    if(err) return next(err);
    if(!result) return next({err: "couldnt find it"});
    req.fpost = result;
    next();
  });
});


router.post('/',auth, function(req,res,next){
  var post = new ForumPost(req.body);
  post.createdBy = req.payload;
  post.creatorId = req.payload._id;
  post.date = new Date();
  User.findOne({email: req.payload.email}, function(err,result){
          if(err) return next(err);
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
    if(err) return res.status(500).send(err);
    res.send(result);
  });
});

//show a particular forum post on a single page
router.get('/forumPost/:id', function(req,res,next){
  ForumPost.findOne({_id: req.params.id})
  .populate('createdBy')
    .exec(function(err, result) {
    if(err) return next(err);
    if(!result) return next("Could not find that post");
    res.send(result);
  });
});

//get forum posts by topic
router.get('/getOne/:topic', function(req,res,next){
  ForumPost.find({channel: req.params.topic})
  .populate('createdBy')
    .exec(function(err,result){
    if(err) return next(err);
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
router.delete('/:id', auth, function(req,res,next){
  // console.log("I made it to the route file");
  ForumPost.remove({_id: req.params.id}, function(err,result){
    if(err) return next(err);
    if(!result) return next(err);
  res.send();
});
});

router.put('/upvote/:id', auth, function(req,res, next){
  console.log(req.params.id);
  console.log(req.body);
  ForumPost.update({_id: req.params.id}, {$push: {upvotes: req.payload._id}, $pull: {downvotes: req.payload._id}}, function(err, result){
    if (err) return next(err);
    if (!result) return next ({err: "That post wasnt found for updating"});
    User.findOne({_id: req.body}, function(err,result){
            if(err) return next(err);
        if(!result) return next({err: "Couldnt find a user with that id"});
        result.update({$inc:{score: +1}},
          function(err,result){
                 if(err) return next(err);
                 if(!result) return next({err: "Couldnt find a user with that id"});
            });
          });
    res.send();
    });
  });

  router.put('/downvote/:id', auth, function(req,res, next){
    console.log(req.params.id);
    console.log(req.body);

    ForumPost.update({_id: req.params.id}, {$push: {downvotes: req.payload._id}, $pull: {upvotes: req.payload._id}}, function(err, result){
      if (err) return next(err);
      if (!result) return next ({err: "That post wasnt found for updating"});
      User.findOne({_id: req.body}, function(err,result){
              if(err) return next(err);
          if(!result) return next({err: "Couldnt find a user with that id"});
          result.update({$inc:{score: -1}},
            function(err,result){
                   if(err) return next(err);
                   if(!result) return next({err: "Couldnt find a user with that id"});
              });
            });
      res.send();
      });
    });




module.exports = router;
