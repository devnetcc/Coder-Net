(function() {
  'use strict';
  angular.module('app')
    .controller('HomeController', HomeController);

  function HomeController(HomeFactory, UserFactory, $state) {
    var vm = this;
    vm.status = UserFactory.status;
    vm.post = {};
    vm.allPosts = {};
    vm.allPosts.reblog = false;
    vm.repost = {};

    vm.getPost = function() {
      HomeFactory.getAllPosts().then(function(res) {
        vm.allPosts = res;
      });
    };
    vm.getPost();

    vm.createPost = function() {
      HomeFactory.postPost(vm.post).then(function(res) {
        vm.allPosts.push(vm.post);
        vm.post = {};
        vm.getPost(); //this fixes our posted on invalide date bug

      });
    };

    vm.reblog = function(post) {
      HomeFactory.reblog(post._id, vm.repost)
        .then(function(res) {
          console.log("Will figure this out later");
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
          HomeFactory.upvote(post._id);
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
          HomeFactory.downvote(post._id);
        }
      }
    };


  }
})();
