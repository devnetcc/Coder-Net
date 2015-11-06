var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
 body: {required: true, type: String},
 createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
 date: Date,
 pic: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
 //post: {type: mongoose.Schema.Types.ObjectId, ref:'ForumPost'}, shouldnt we link it to forum?
 //votes: Number 
});

mongoose.model('Comment', CommentSchema);