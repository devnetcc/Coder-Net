var mongoose = require('mongoose');

var ForumPostSchema = new mongoose.Schema({
 title: {required: true, type: String},
 category: {required: true, type: String},
 body: {required: true, type: String},
 createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
 date: Date,
 pic: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
 comments: {type: mongoose.Schema.Types.ObjectId, ref:'Comment'}
 //tags: [],
 //votes: Number 
});

mongoose.model('ForumPost', ForumPostSchema);