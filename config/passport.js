var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');


passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password'},
	function(email, password, done) {
  User.findOne({email: email}, function(err, user) {
    if(err) return done(err);
    if(!user) return done("Could not find user in the database.");
    if(!user.checkPassword(password)) return done("Incorrect password.");
    return done(null, user);
  });
}));

passport.use(new LinkedInStrategy({
    consumerKey: process.env.LINKEDIN_KEY,
    consumerSecret: process.env.LINKEDIN_SECRET,
    callbackURL: "http://localhost:3000/api/users/auth/linkedin/callback"
  },
  function(token, tokenSecret, profile, done) {
		//-----------NEEDS FUNCTION-------------------------------------
    // User.find({ linkedinId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));
