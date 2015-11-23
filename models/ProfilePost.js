var mongoose = require('mongoose');

var ProfilePostSchema = new mongoose.Schema({
 title: { type: String},
 body: { type: String},
 createdBy: {name: String, lastName: String},
 creatorId: String,
 date: Date,
 avi: String,
 pic: String,
 comments: [{
   creatorId: String,
   creatorName: String,
   title: String,
   content: String,
   photo: String,
   video: String,
   avi: String,
 }],
 upvotes: [String],
 downvotes: [String],
 tags: [],
});

mongoose.model('ProfilePost', ProfilePostSchema);
