var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
name: {type: String, lowercase: true, trim: true},
lastName: { type: String, lowercase: true, trim: true},
email: { unique: true, type:String, lowercase: true, trim: true},
isValidated: Boolean, // Checks if the user has been validated via email
rand: Number,
create: Date,
pic: String,
location: String, //should there be separate props for city, state, country?
role: String,
title: String,
userBeen: String,
userAt: String,
userGoing: String,
github: String,
linkedinUrl: String,
profilePosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProfilePost'}],
forumPosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'ForumPost'}],
comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}],
followers: [{
  followerID: String,
  followerName: String,
}],
following: [{
  celebrityId: String,
  celebrityName: String,
}],
languages: [{lang: String, level: Number}],
joined: Date,
passwordHash: String,
salt: String,
summary: String,
token: String,
linkedin: {
  id: String,
  token: String,
  email: String,
  name: String,
  lastName: String,
  photo: String,
  summary: String,
  profileUrl: String,
},
facebook: {
id: String,
token: String,
email: String,
name: String,
lastName: String,
photo: String
},
twitter: {
id: String,
token: String,
email: String,
photo: String,
screen_name: String
}
});

UserSchema.methods.setPassword = function(password) {
 this.salt = crypto.randomBytes(16).toString('hex');
    this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

UserSchema.methods.checkPassword = function(password) {
 var passwordHash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
 return (passwordHash === this.passwordHash);
};

UserSchema.methods.generateJWT = function() {
 return jwt.sign({
   _id: this._id,
   name: this.name,
   lastName: this.lastName,
   email: this.email,
   pic: this.pic

 },  "CoderCamps"); //Add Passcode here
};

UserSchema.methods.getTokens = function() {
  return localStorage.getItem('token');
}

UserSchema.methods.urlBase64Decodes = function(str) {
  var output = str.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0: { break; }
    case 2: { output += '=='; break; }
    case 3: { output += '='; break; }
    default: {
      throw 'Illegal base64url string!';
    }
  }
  return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
}

function getToken() {
  return localStorage.getItem('token');
}

function setToken(token) {
  return localStorage.setItem('token', token);
}

function removeToken() {
  return localStorage.removeItem('token');
}

function urlBase64Decode(token) {
  // token = getToken();
  if(token ===  undefined){
    // return false;
    console.log(token);
    return;
  }
  else {
  var output = token.replace(/-/g, '+').replace(/_/g, '/');
  switch (output.length % 4) {
    case 0:
      {
        break;
      }
    case 2:
      {
        output += '==';
        break;
      }
    case 3:
      {
        output += '=';
        break;
      }
    default:
      {
        throw 'Illegal base64url string!';
      }
  }

  return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
}
}

// UserSchema.methods.setUsers = function(){
//   var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
//   return {
//   name = this.name;
//   lastName = user.lastName;
//   pic = user.pic;
//   email = user.email;
//   _id = user._id;
// }


mongoose.model('User', UserSchema);
