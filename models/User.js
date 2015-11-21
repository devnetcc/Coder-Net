var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
userName: {type: String, lowercase: true, trim: true},
name: {type: String, lowercase: true, trim: true},
lastName: { type: String, lowercase: true, trim: true},
email: { unique: true, type:String, lowercase: true, trim: true},
isValidated: Boolean, // Checks if the user has been validated via email
rand: Number,
msgcount: Number,
color: String,
tagLine: String,
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
// inbox: [{
  inmessage: [{
    to: String,
    from: String,
    body: String,
    sent: Date,
    senderId: String,
  }],
// }],
// outbox:[{
  outmessage: [{
    to: String,
    from: String,
    body: String,
    recieved: Date,
    recieverId: String,
  // }]
}],
profilePosts:
// [{type: mongoose.Schema.Types.ObjectId, ref: 'ProfilePost'}],
[{
  title: String,
  body: {required: true, type: String},
  createdBy: {name: String, lastName: String},
  creatorId: String,
  date: Date,
  avi: String,
  comments: [{
    creatorId: String,
    creatorName: String,
    title: String,
    content: String,
    photo: String,
    video: String,
    avi: String,
  }],
}],
profileFBlink: String,
profileTWlink: String,
profileGHlink: String,
profileLKlink: String,

// profilePosts: [{type: mongoose.Schema.Types.ObjectId, ref: 'ProfilePost'}],
//changed profilePost schema -see above
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
message: [{type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
joined: Date,
passwordHash: String,
salt: String,
summary: String,
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
name: String,
id: String,
token: String,
email: String,
photo: String,
screen_name: String,
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
   pic: this.pic,
   userName: this.userName,
   followerID: this.followerID,
   followerName: this.followerName

 },  "CoderCamps"); //Add Passcode here
};



mongoose.model('User', UserSchema);
