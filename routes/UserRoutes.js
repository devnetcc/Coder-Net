var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ProfilePost = mongoose.model('ProfilePost');
var Comment = mongoose.model('Comment');
var ForumPost = mongoose.model('ForumPost');



var passport = require('passport');

router.param('id', function(req, res, next, id) {
  User.findOne({
      _id: id
    })
    .exec(function(err, result) {
      if (!result) {
        res.status(404).send({
          err: "Could not find that specific user."
        });
      }
      req.user = result;
      next();
    });
});


router.post('/register', function(req, res, next) {
  var user = new User(req.body);
  user.setPassword(req.body.password);
  user.save(function(err, result) {
    if(err) return next(err);
  res.send(user.createToken());
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if(err) return next(err);
    res.send(user.createToken());
  })(req, res, next);
});


router.get('/:id', function(req, res, next) {
  User.findOne({_id: req.params.id}, function(err, result) {
    res.send(result);
  });
});


router.put('/:id', function(req,res, next){
  User.update({_id: req.body._id}, req.body, function(err, result){
    if (err) return next(err);
    if (!result) return next ({err: "That user wasnt found for updating"});
    res.send(result);
    });
  });

  router.delete('/:id', function(req, res, next) {
    User.remove({_id: req.params.id}, function(err, result) {
        if(err) {return next(err);}
        res.send();
    });
  });


module.exports = router;
