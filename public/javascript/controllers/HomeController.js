(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  function HomeController(HomeFactory, UserFactory, $state, ProfileFactory) {
    var vm = this;
    vm.status = UserFactory.status;
    vm.post = {};
    vm.post.tags =[];
    vm.allPosts = {};
    vm.allPosts.reblog = false;
    vm.repost = {};
    vm.allPosts.show = false;
    vm.followed = false;
    vm.comfollowed = false;

    ProfileFactory.getProfile(vm.status._id).then(function(res){
    	vm.person = res;
      vm.getAllPost();
    });


    vm.getPost = function() {
      HomeFactory.getAllPosts().then(function(res) {


//         var j = vm.allPosts.length -1;
//         while (j >= 0) {
//         for(var i =0; i < vm.person.following.length; i++){
//           if(vm.allPosts[j].creatorId === vm.person.following[i].celebrityId){
//             console.log("found something");
//             vm.allPosts.show = true;
//           }
//           j--;
//         }
// }\
        for(var i=0; i < vm.allPosts.length; i++){
          vm.allPosts = res;
          // vm.allPosts[i].show = false;
          for(var j = 0; j < vm.person.following.length; j++){
            if(vm.allPosts[i].creatorId !== vm.person.following[j].celebrityId) {
               vm.allPosts[i].show = false;
              //  break;
            }
            else{
              vm.allPosts[i].show = true;

            }
          }
        }
        console.log(vm.allPosts[0].show);
        vm.allPosts = res;
        // for(var i =0; i < vm.person.following.length; i++){
        //   if(vm.allPosts.creatorId === vm.person.following[0].celebrityId){
        //     vm.allPosts.show = true;
        //   }
        // }
      });
    };

    // vm.getPost();
    vm.getAllPost = function() {
      console.log("befor going to factory in getAllPost");

      HomeFactory.getAllPosts().then(function(res) {
        vm.allPosts = res;

        for(var i = 0; i < vm.allPosts.length; i++) {
          vm.allPosts[i].show = true;
        }
        console.log(vm.allPosts.show + 'showing?');



      });
    };
    vm.createPost = function() {
      HomeFactory.postPost(vm.post).then(function(res) {
        // vm.allPosts.push(vm.post);
        vm.post = {};
        vm.getPost(); //this fixes our posted on invalide date bug

      });
    };

    vm.reblog = function(post) {
      HomeFactory.reblog(post._id, vm.repost)
        .then(function(res) {
          vm.repost ={};
        });
    };
    vm.contact = function() { // this is for the mock contact form we have.
      $state.go("Home");
    };

    vm.followOnPost = function(post) {
      UserFactory.followOnPost(post.creatorId, vm.status)
        .then(function(res) {
          console.log("You have a new follower");
        });
    };



    vm.upvote = function(post) {
      if (post.creatorId == vm.status._id) {
        alert("You cannot vote for your own posts!");
        return;
      } else {
        if (post.upvotes.indexOf(vm.status._id) != -1) {
          alert("You have voted for this post before!");
          return;
        } else {
          var index = post.downvotes.indexOf(vm.status._id);
          if (index != -1) {
            post.downvotes.splice(index, 1);
          }
          HomeFactory.upvote(post._id, post.creatorId);
        }
      }
    };


    vm.downvote = function(post) {
      if (post.creatorId == vm.status._id) {
        alert("You cannot vote for your own posts!");
        return;
      } else {
        if (post.downvotes.indexOf(vm.status._id) != -1) {
          alert("You have voted for this post before!");
          return;
        } else {
          var index = post.upvotes.indexOf(vm.status._id);
          if (index != -1) {
            post.upvotes.splice(index, 1);
          }
          HomeFactory.downvote(post._id, post.creatorId);
        }
      }
    };

  vm.uploadPic = function(){
          filepicker.setKey("ANDYMo7mqQjawgErCA0F0z");
          filepicker.pick({
              mimetype: 'image/*', /* Images only */
              maxSize: 1024 * 1024 * 5, /* 5mb */
              imageMax: [1500, 1500], /* 1500x1500px */
              cropRatio: 1/1, /* Perfect squares */
              services: ['*'] /* All available third-parties */
          }, function(blob){
              // Returned Stuff
              var filename = blob.filename;
              vm.post.pic = blob.url;
              var id = blob.id;
              var isWriteable = blob.isWriteable;
              var mimetype = blob.mimetype;
              var size = blob.size;
            // ProfileFactory.uploadPic(blob).then(function(res){
            //   vm.allPosts.pic = res;
            // });
        });
        vm.getPost();
      };

  }
})();
