var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
 body: {required: true, type: String},
 createdBy: {},
 creatorId: String,
 date: Date,
 // forumPost: [{type: mongoose.Schema.Types.String, ref:'ForumPost'}],
 forumPost: String
});

mongoose.model('Comment', CommentSchema);
