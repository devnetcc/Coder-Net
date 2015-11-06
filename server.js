if(!process.env.NODE_ENV){
	require('dotenv').load();
}
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 3000;
var passport = require("passport");
var mongoose = require('mongoose');
var session = require('express-session');
var uuid = require('uuid');
// var LinkedInStrategy = require('passport-linkedin').Strategy;
require('./models/Comment');
require('./models/ForumPost');
require('./models/ProfilePost');
require('./models/User');
require('./config/passport');

mongoose.connect("mongodb://localhost/DevNet");


app.set('views', path.join(__dirname, 'views'));
//set the view engine that will render HTML from the server to the client
app.engine('.html', require('ejs').renderFile);
//Allow for these directories to be usable on the client side
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/bower_components'));
//we want to render html files
app.set('view engine', 'html');
app.set('view options', {
	layout: false
});

//middleware that allows for us to parse JSON and UTF-8 from the body of an HTTP request
passport.initialize();
// passport.use(new LinkedInStrategy({
// 		consumerKey: LINKEDIN_API_KEY,
//     consumerSecret: LINKEDIN_SECRET_KEY,
//     callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     User.findOrCreate({ linkedinId: profile.id }, function (err, user) {
//       return done(err, user);
//     });
//   }
// ));
app.use(session({
  genid: function(req) {
    return uuid() // use UUIDs for session IDs
  },
  secret: process.env.LINK_UUID_SECRET
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Route Links
var commentRoutes = require('./routes/CommentRoutes');
var forumRoutes = require('./routes/ForumRoutes');
var userRoutes = require('./routes/UserRoutes');
var profileRoutes = require('./routes/ProfileRoutes');


//on homepage load, render the index page
app.get('/', function(req, res) {
	res.render('index');
});

//API
app.use('/api/comments', commentRoutes);
app.use('/api/forums', forumRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profiles', profileRoutes);



var server = app.listen(port, function() {
	var host = server.address().address;
	console.log('Example app listening at http://localhost:' + port);
});
