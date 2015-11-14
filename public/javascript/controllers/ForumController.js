(function() {
  'use strict';
  angular.module('app')
    .controller('ForumController', ForumController);

	function ForumController(ForumFactory, UserFactory, $state, $stateParams) {
		var vm = this;
		vm.status = vm.UserFactory;
		vm.topics=["General", "Job Board", "Interview Prep", "Code Questions","Meetups", "Bootcamp Reviews"];
		vm.fpost = {};
		// vm.forumPosts = {};
    // vm.topicPosts = {};


// ForumFactory.getAllPost().then(function(res){
// 							vm.forumPosts = res;
// });

if ($stateParams.id){
  // vm.apost = {};
ForumFactory.getPostById($stateParams.id).then(function(res){
  // console.log(vm.apost);
	vm.apost = res;
});
}

vm.cancelEdit = function(){
  ForumFactory.getPostById($stateParams.id).then(function(res){
  	vm.apost = res;
    $state.go("ForumPost", {id: $stateParams.id});
  });
};

ForumFactory.startFPost($stateParams.id).then(function(res){
	vm.epost = res;
});

vm.getPostsByTopic = function (topic) {
ForumFactory.getPostsByTopic(topic).then(function(res){
  vm.topicPosts = res;
});
};

vm.createforumpost = function(){
	ForumFactory.createforumpost(vm.fpost)
	.then(function(){
		$state.go('Forums');
	});
};

vm.editFPost = function(){
      ForumFactory.editFPost(vm.epost).then(function(){
        $state.go('ForumPost', {id: $stateParams.id});
      });
    };

vm.deleteFPost = function(fpost){
	ForumFactory.deleteFPost(fpost._id)
	.then(function(){
		// console.log("Made it back to controller. about to splice!");
		vm.forumPosts.splice(vm.forumPosts.indexOf(fpost),1);
		$state.go('Forums');

	});
};
// ---------------------

vm.postComments = function(){
  ForumFactory.postComments(vm.newComment, $stateParams.id).then(function(res){
    vm.comments.push(vm.newComment);
    vm.newComment = {};
    $state.go('ForumPost', {id: $stateParams.id});
  });
};

vm.showComments = function(){
  ForumFactory.showComments($stateParams.id).then(function(res){
    vm.comments = res;
  // $state.go('ForumPost', {id: $stateParams.id});
  });
};
vm.showComments();

}

})();
