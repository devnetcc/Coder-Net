var Pusher = require('pusher');
var express = require('express');
var router = express.Router();

var pusher = new Pusher({
   appId: '156024',
   key: '875def9fc21bdcfe8b72',
   secret: '520f41ff1b825a6a7e1c'
});


// trigger on my_channel' an event called 'my_event' with this payload:
router.get('/', function(req,res){
  pusher.trigger('my_channel', 'my_event', {
     message: "hello world"
  });
  res.send("Notifcation triggered");
});

module.exports = router;
