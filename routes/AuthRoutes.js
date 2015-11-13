var express = require('express') ;
var router = express.Router() ;
var mongoose = require('mongoose') ;
var User = mongoose.model('User') ;
var jwt = require('express-jwt');
var passport = require('passport') ;
var linkedin = require('passport-linkedin');



router.get('/linkedin',
passport.authenticate('linkedin', { scope: ['r_basicprofile','r_emailaddress']})) ;

router.get('/linkedin/callback',
passport.authenticate('linkedin', { failureRedirect: '/' }),
  	function(req, res) {
  		if(req.user) {
        req.user.generateJWT();
  			res.redirect("/#/profile/"+ req.user._id) ;
  		} else {
  			res.send("You are not authenticated") ;
  		}
  	});
module.exports = router;
