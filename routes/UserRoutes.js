var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ProfilePost = mongoose.model('ProfilePost');
var Comment = mongoose.model('Comment');
var ForumPost = mongoose.model('ForumPost');
var passport = require('passport');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: 'payload',
  secret: 'CoderCamps'
});

router.param('id', function(req, res, next, id) {
  User.findOne({
      _id: id
    })
    .populate('comments profilePosts forumPosts')
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

// Login router
router.post('/login', function(req, res, next) {
  var email = req.body.email;

  var isUserValidated;

  // Check if user has been validated.
  User.findOne({
    email: email
  }, function(err, user) {
    if (err) return res.status(500).send({
      err: "Error inside the server"
    });
    if (!user) return res.status(400).send("Invalid Email or Password");
    if (!user.isValidated) {
      isUserValidated = false;
      return res.send("Please confirm email to continue");

    }
    loginUser();
  });

  function loginUser() {
    passport.authenticate('local', function(err, user) {
      if (err) return next(err);
      res.send(user.generateJWT());
    })(req, res, next);
  }
});


router.post('/register', function(req, res, next) {
  var user = new User(req.body);
  user.setPassword(req.body.password);
  user.save(function(err, result) {
    if (err) return next(err);
    res.send(user.generateJWT());
  });
});

router.put('/followOnProfile/:id', function(req, res, next) {
  User.findOne({
    _id: req.body._id
  }, function(err, result) {
    if (err) return next(err);
    if (!result) return next({
      err: "Couldnt find that user for updating!"
    });

    result.update({
        $push: {
          following: {
            celebrityId: req.params.id,
          }
        }
      },
      function(err, result) {
        if (err) return next(err);
        if (!result) return next({
          err: "That user wasnt found for updating!"
        });
      });

    User.update({
        _id: req.params.id
      }, {
        $push: {
          followers: {
            followerID: req.body._id,
            followerName: req.body.name,
          }
        }
      },
      function(err, result) {
        if (err) return next(err);
        if (!result) return next({
          err: "That user wasnt found for updating!"
        });
      });

    res.send(result);

  });
});


console.log('before unfollow route');

router.put('/unfollowProfile/:id', function(req, res, next) {
  console.log(req.params.id); //user id
  console.log(req.params); //user Id Obj
  User.update({
    _id: req.body._id
  }, {
    $pull: {
      following: {
        celebrityId: req.params.id
      }
    }
  }, function(err, result) {
    console.log(result); //null
    if (err) return next(err);
    if (!result) return next(err);
    // 	result.remove({_id: req.params.id}, function(err, result) {
    // 	if(err) return next(err);
    // 	if(!result) return next(err);
    // })
    res.send();
  });

});

router.put('/followOnPost/:id', function(req, res, next) {
  //updates the folling array of the signed in user (the person who clicked the 'follow' button)
  User.findOne({
    _id: req.body._id
  }, function(err, result) {
    if (err) return next(err);
    if (!result) return next({
      err: "Couldnt find that user for updating!"
    });

    result.update({
        $push: {
          following: {
            celebrityId: req.params.id,
          }
        }
      },
      function(err, result) {
        if (err) return next(err);
        if (!result) return next({
          err: "That user wasnt found for updating!"
        });
      });

    User.update({
        _id: req.params.id
      }, {
        $push: {
          followers: {
            followerID: req.body._id,
            followerName: req.body.name,
          }
        }
      },
      function(err, result) {
        if (err) return next(err);
        if (!result) return next({
          err: "That user wasnt found for updating!"
        });
      });

    res.send(result);

  });
});

router.get('/:id', function(req, res, next) {

  User.findOne({
    _id: req.params.id
  }, function(err, result) {

    // console.log(result.token);
    res.send(req.user);
  });
});



router.put('/:id', function(req, res, next) {
  User.update({
    _id: req.body._id
  }, req.body, function(err, result) {
    if (err) return next(err);
    if (!result) return next({
      err: "That user wasnt found for updating"
    });
    res.send(result);
  });
});

router.delete('/:id', function(req, res, next) {
  User.remove({
    _id: req.params.id
  }, function(err, result) {
    if (err) {
      return next(err);
    }
    res.send();
  });
});


// post pro pic
router.put('/:id/pic', function(req, res, next) {
  User.update({
      _id: req.params.id
    }, {
      pic: req.body.url,
    },
    function(err, result) {
      if (err) return next(err);
      if (!result) return next("Could not create the object. Please check all fields.");
      res.send(req.body.url);
    });
});




/*-----------THIRD PARTY LOGINS----------------------------
---------------------------------------------------------*/

// router.get('/auth/linkedin',
//   passport.authenticate('linkedin'));
//
// router.get('/auth/linkedin/callback',
//   passport.authenticate('linkedin', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });


module.exports = router;
