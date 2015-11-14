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




router.post('/',auth, function(req, res, next) {
  // console.log("req body" + req.body.email);
  // console.log(req.body, "req.body");
console.log(req.payload , "payload is");
  var post = new ProfilePost(req.body);
  post.createdBy = req.payload.name;
  post.creatorId = req.payload._id;
  post.date = new Date();
  post.save(function(err, result) {
    if(err) return next(err);
    if(!result) return next("Could not Create Post");
    User.findOne({email: req.payload.email}, function(err, user){
      if(!user) return res.status(404).send({err: "Could not find that user."});
    user.profilePosts.push(result);
    user.save(function(err, user) {
    });
    res.send();
    });
  });
});

// router.get('/:id', function(req, res, next){
//   ProfilePost.find({createdBy: req.params.id}, function(err, result){
//     if(err) {return next(err);}
//     if(!result) {return next({err: "Error finding post by that user ID"});}
//     res.send(result);
//   });
// });

//get call for all the posts - home page.
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

router.put('/:id', function(req,res, next){
  ProfilePost.update({_id: req.params.id}, req.body, function(err, result){
    if (err) return next(err);
    if (!result) return next ({err: "That post wasnt found for updating"});
    res.send(result);
    });
  });


module.exports = router;
