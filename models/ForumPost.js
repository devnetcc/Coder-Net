var mongoose = require('mongoose');

var ForumPostSchema = new mongoose.Schema({
 title: {required: true, type: String},
 channel: String,
 // category: {required: true, type: String},
 body: {required: true, type: String},
 date: Date,
 createdBy: {},
 comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}]
 //tags: [],
 //votes: Number
});

mongoose.model('ForumPost', ForumPostSchema);
