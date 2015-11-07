(function() {
  'use strict';
  angular.module('app')
    .controller('ForumController', ForumController);

	function ForumController(ForumFactory, UserFactory, $state,$stateParams) {
		var vm = this;
		vm.status = vm.UserFactory;
		vm.topics=["General", "Job Board", ""];
		vm.fpost = {};
		vm.forumPosts = {};
		vm.apost = {};
		vm.epost={};
		vm.newComment ={};


ForumFactory.getAllPost().then(function(res){
							vm.forumPosts = res;
						});

ForumFactory.getPostById($stateParams.id).then(function(res){
	vm.apost = res;
});

ForumFactory.startFPost($stateParams.id).then(function(res){
	vm.epost = res
})

vm.createforumpost = function(){
	ForumFactory.createforumpost(vm.fpost)
	.then(function(){
		$state.go('Forum');
	})
}

vm.editFPost = function(){
	console.log("inside the editfpost (controller)");
      ForumFactory.editFPost(vm.epost).then(function(){
        // console.log("Made it back to the controller for editing");
        $state.go('Forum');
      });
    };

vm.deleteFPost = function(fpost){
	ForumFactory.deleteFPost(fpost._id)
	.then(function(){
		// console.log("Made it back to controller. about to splice!");
		vm.forumPosts.splice(vm.forumPosts.indexOf(fpost),1);
		$state.go('Forum');

	});
}


})();
