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
var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
     // for some GHEs; none for GitHub
    timeout: 5000,
    headers: {
        "user-agent": "My-Cool-GitHub-Appdsadajfskhasdlhkasdflfdh" // GitHub is happy with a unique user agent
    }
});

// github.repos.getAll({
//     user: "pearl1991"
// }, function(err, res) {
//     console.log(JSON.stringify(res));
// });

router.param('id', function(req, res, next, id) {
  User.findOne({_id: id})
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

router.put('/followOnProfile/:id', function(req,res,next){
	User.findOne({_id: req.body._id}, function(err,result){
		if(err) return next(err);
		if(!result) return next({err: "Couldnt find that user for updating!"});

		result.update({$push: {following:{
			celebrityId: req.params.id,
		}}},
			function(err,result){
				if(err) return next(err);
				if(!result) return next ({err: "That user wasnt found for updating!"});
			});

	User.update({_id: req.params.id},{$push: {followers: {
		followerID: req.body._id,
		followerName: req.body.name,
	}}},
		 function(err, result){
		if(err) return next(err);
		if(!result) return next ({err: "That user wasnt found for updating!"});
	});

		res.send(result);

	});
});



//req.body._id is person doing the unfollowing: need to lession their following array
//req.params.id is person losing a follower. need to lessen their followers array
router.put('/unfollowProfile/:id', function(req, res, next) {
  User.findOne({_id: req.body._id}, function(err,result){
    if(err) return next(err);
    if(!result) return next({err: "Couldnt find that user for updating!"});

    result.update({$pull: {following:{
      celebrityId: req.params.id,
    }}},
      function(err,result){
        if(err) return next(err);
        if(!result) return next ({err: "That user wasnt found for updating!"});
      });

  User.update({_id: req.params.id},{$pull: {followers: {
    followerID: req.body._id,
    // followerName: req.body.name,
  }}},
     function(err, result){
    if(err) return next(err);
    if(!result) return next ({err: "That user wasnt found for updating!"});
  });

    res.send(result);

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
    if (err) return next(err);
    if (!result) return next({
      err: "That user wasnt found for updating!"
    });
    // console.log(result.token);
    res.send(result);
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

// router.get('/messages/:id', auth, function(req,res,next){
//   res.send(req.user);
// })
router.post('/messages/:id', auth, function(req,res,next){
	console.log(req.user);
	// User.findOne({_id: req.params._id}, function(err,result){
	// 	console.log(result);
	// 	if(err) return next(err);
	// 	if(!result) return next({err: "Couldnt find that user for updating!"});
			var usersname = req.user.name;
			var userId = req.user._id
		req.user.update({$push: {inmessage:{
			body: req.body.body,
			to: req.user.name,
			from: req.payload.name,
			sent:new Date(),
			senderId: req.payload._id,
		}}},
			function(err,result){
				if(err) return next(err);
				if(!result) return next ({err: "That user wasnt found for updating!"});
			});

	User.update({_id: req.payload._id},{$push: {outmessage: {
		body: req.body.body,
		from: req.payload.name,
		to: usersname,
		recieved:new Date(),
		recieverId: userId,
	}}},
		 function(err, result){
		if(err) return next(err);
		if(!result) return next ({err: "That user wasnt found for updating!"});
		res.send(result);

	});


	// });
})



module.exports = router;
