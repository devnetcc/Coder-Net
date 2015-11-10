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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//   THESE BELOW ADDED FOR RESET FUNCTION USING BCRYPT METHOD FROM PEARL LINK.
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
//
// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({
      email: email
    }, function(err, user) {
      if (err) return done(err);
      if (!user) return done("Could not find user in the database.");
      if (!user.checkPassword(password)) return done("Incorrect password.");
      return done(null, user);
    });
  }));

	// GithubStrategy
	// passport.use(new GithubStrategy({
	//   clientID: '687f365bddcf9b455b65',
	//   clientSecret: 'your app client secret',
	//   callbackURL: 'http://localhost:3000/auth/callback'
	// }, function(accessToken, refreshToken, profile, done){
	//   done(null, {
	//     accessToken: accessToken,
	//     profile: profile
	//   });
	// }));




// passport.use(new LinkedInStrategy({
//     consumerKey: process.env.LINKEDIN_KEY,
//     consumerSecret: process.env.LINKEDIN_SECRET,
//     callbackURL: "http://localhost:3000/api/users/auth/linkedin/callback"
//   },
//   function(token, tokenSecret, profile, done) {
// 		console.log(profile.id);
    //-----------NEEDS FUNCTION-------------------------------------
    // User.findOne({ profile.id}, function(err, result) {
    //   res.send(result);
    // });
    // User.find({ linkedinId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  // }
// ));
