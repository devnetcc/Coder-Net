var mongoose = require('mongoose');

var ForumPostSchema = new mongoose.Schema({
 title: {required: true, type: String},
 channel: String,
 body: {required: true, type: String},
 date: Date,
 createdBy: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
 comments: [{type: mongoose.Schema.Types.ObjectId, ref:'Comment'}]
});

mongoose.model('ForumPost', ForumPostSchema);
