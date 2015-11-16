var mongoose = require('mongoose');

var ProfilePostSchema = new mongoose.Schema({
 title: {required: true, type: String},
 body: {required: true, type: String},
 createdBy: {name: String, lastName: String},
 creatorId: String,
 date: Date,
 //tags: [],
 //votes: Number
});

mongoose.model('ProfilePost', ProfilePostSchema);
