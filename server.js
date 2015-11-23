if(!process.env.NODE_ENV){
	require('dotenv').load();
}

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('passport');

require('./models/Comment');
require('./models/ForumPost');
require('./models/ProfilePost');
require('./models/User');
// require('./models/inbox');
require('./config/passport');

mongoose.connect(process.env.MONGOLAB_URI, function(err) {
  if (err) {
    console.log(process.env.MONGOLAB_URI);
    return console.log("Error database");
  }
  console.log("Database Connected");
});



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


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
// app.use(session({ secret: 'mysecret' })); //add for GithubStrategy
app.use(session({
  secret: 'session secret key',
  cookie: {
    secure: false
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// Route Links
var commentRoutes = require('./routes/CommentRoutes');
var forumRoutes = require('./routes/ForumRoutes');
var userRoutes = require('./routes/UserRoutes');
var profilePostRoutes = require('./routes/ProfilePostRoutes');
var resetRoutes = require('./routes/ResetPassRoutes');
// var inboxRoutes = require('./routes/InboxRoutes');
var authRoutes = require('./routes/AuthRoutes');
var notifRoutes = require('./routes/notifications');


//on homepage load, render the index page
app.get('/', function(req, res) {
  res.render('index');
});

//API
app.use('/api/comments', commentRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', profilePostRoutes);
app.use('/api/reset', resetRoutes);
// app.use('/api/inbox', inboxRoutes);
app.use('/api/auth', authRoutes);
app.use('/notification', notifRoutes);


var server = app.listen(port, function() {
  var host = server.address().address;
  console.log('Example app listening at http://localhost:' + port);
});
