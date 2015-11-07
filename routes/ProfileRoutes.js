var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var ProfilePost = mongoose.model('ProfilePost');
var jwt = require('express-jwt');
var auth = jwt({
  userProperty: "payload", //req.payload._id in the Route
  secret: "Coder Camps" //matches the secret in model
});


// router.param('id', function(req, res, next, id) {
//   User.findOne({
//       _id: id
//     })
//     .exec(function(err, result) {
//       if (!result) {
//         res.status(404).send({
//           err: "Could not find that specific user."
//         });
//       }
//       req.user = result;
//       next();
//     });
// });



router.get('/:id', function(req, res, next) {
  User.findOne({_id: req.params.id}, function(err, result) {
    res.send(result);
  });
});


router.delete('/:id', auth, function(req, res, next) {
  User.remove({_id: req.params.id}, function(err, result) {
      if(err) {return next(err);}
      res.send();
  });
});

router.put('/:id', auth, function(req,res, next){
  User.update({_id: req.body._id}, req.body, function(err, result){
    if (err) return next(err);
    if (!result) return next ({err: "That user wasnt found for updating"});
    res.send(result);
    });
  });







module.exports = router;
