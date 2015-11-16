(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(HomeFactory, UserFactory,  $state) {
		var vm = this;
		    vm.status = UserFactory.status;
				vm.post = {};
				vm.allPosts = {};
				// createdBy: vm.status._id, pic: vm.status.pic

		HomeFactory.getAllPosts().then(function(res){
  			vm.allPosts=res;
		});

		vm.createPost = function (){
		HomeFactory.postPost(vm.post).then(function(res){
			vm.allPosts.push(vm.post);
			vm.post = {};
		});
		};

    vm.contact = function() { // this is for the mock contact form we have.
      $state.go("Home");
    };

		vm.followOnPost = function(post){
			UserFactory.followOnPost(post.creatorId, vm.status)
			.then(function(res){
				console.log("You have a new follower");
			});
		};


	}
})();
