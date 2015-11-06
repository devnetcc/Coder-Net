var mongoose = require('mongoose');

var ProfilePostSchema = new mongoose.Schema({
 title: {required: true, type: String},
 body: {required: true, type: String},
 createdBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
 date: Date,
 pic: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
 //tags: [],
 //votes: Number 
});

mongoose.model('ProfilePost', ProfilePostSchema);