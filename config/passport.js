var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var LinkedInStrategy = require('passport-linkedin').Strategy;
var FacebookStrategy = require('passport-facebook');
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

passport.use(new LinkedInStrategy({
    consumerKey: '75njqmr45tlthj',
    consumerSecret: 'EgY1y6V9PhBr84iM',
    callbackURL: "/api/auth/linkedin/callback",
		profileFields: ['id', 'email-address','first-name','last-name', 'summary', 'picture-urls::(original)', 'public-profile-url'],
  },
	function(accessToken, refreshToken, profile, done) {
		// process.nextTick is a Node.js function for asynchronous
		// Waits for data to come back before continuing.
		process.nextTick(function() {
			// Information for accessing our database
			// Whatever is returned will be stored in profile.
			// Returns err if it cannot connect
			User.findOne({ 'linkedin.id' : profile.id }, function(err, user) {
				if(err) {
					console.log('DEBUG: Error connecting') ;
					return done(err) ;
				}
				if(user) {
					console.log('DEBUG: Current user') ;
					// user.setUser();
					
					return done(null, user) ;
				}
				// Else no user is found. We need to create a new user.
				else {
					console.log("DEBUG: New User.") ;
					console.log(profile + " profile") ;

					var newUser = new User() ;
					newUser.linkedin.id = profile.id ;
					newUser.token = newUser.linkedin.id;
					newUser.linkedin.token = accessToken ;

					newUser.linkedin.name = profile.name.givenName;
					newUser.linkedin.lastName = profile.name.familyName;

					newUser.name = newUser.linkedin.name;
					newUser.lastName = newUser.linkedin.lastName;


					newUser.linkedin.email = profile.emails[0].value;
					newUser.email = newUser.linkedin.email ;

					// newUser.linkedin.photo = profile.pictureUrls.values[0] ;
					// newUser.pic = newUser.linkedin.photo;
					console.log(profile);


					newUser.linkedin.profileUrl = profile.publicProfileUrl;
					newUser.linkedinUrl = newUser.linkedin.profileUrl;


					newUser.linkedin.summary = profile._json.summary;
					newUser.summary = newUser.linkedin.summary;
					newUser.joined = new Date() ;

					// Save the newUser to the database.
					newUser.save(function(err) {
						if(err)
							throw err ;
						// Otherwise return done, no error and newUser.
						return done(null, newUser) ;
					});
				}
			}) ;

		});
  }
));

function generateFacebookPhotoUrl(id, accessToken, height, width) {
	var picUrl = "https://graph.facebook.com/" ;
	picUrl += id ;
	picUrl += "/picture?width=" ;
	picUrl += width ;
	picUrl += "&height=" ;
	picUrl += height ;
	picUrl += "&access_token=" ;
	picUrl += accessToken ;
	return picUrl ;
}

passport.use(new FacebookStrategy({
	clientID: "1109973309042696",
	clientSecret: "81f7555642ab258249d2034b33f562c8",
	callbackURL: "/api/auth/facebook/callback",
	profileFields: ['emails','name','picture']
}, function(accessToken, refreshToken, profile, done) {
	process.nextTick(function() {
		console.log(profile);
		User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
					if(err) {
						return done(err) ;
					}
					if(user) {
						return done(null, user) ;
					}
					else {

						var newUser = new User() ;

						newUser.facebook.id = profile.id ;

						newUser.facebook.token = accessToken ;

						newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName ;

						newUser.name = newUser.facebook.name ;

						newUser.facebook.email = profile.emails ? profile.emails[0].value : profile.username + "@facebook.com";

						newUser.username = newUser.facebook.email ;

						newUser.facebook.photo = profile.photos[0].value ;

						newUser.pic = generateFacebookPhotoUrl(profile.id, accessToken, 300, 300) ;

						newUser.created = new Date() ;

						newUser.save(function(err) {
							if(err)
								throw err ;
							// Otherwise return done, no error and newUser.
							return done(null, newUser) ;
						});
					}
				}) ;
		}) ;
	}
)) ;
