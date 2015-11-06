var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
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
