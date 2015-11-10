(function() {
	'use strict';
	angular.module('app')
	.controller('ProfilePostController', ProfilePostController);

	function ProfilePostController(HomeFactory, UserFactory,  $state, $stateParams) {
		var vm = this;
		    vm.status = UserFactory.status;
        vm.post = {};


//
// HomeFactory.getAllPostsByUser($stateParams.id).then(function(res){
//   vm.posts=res;
// });

vm.createPost = function (){
HomeFactory.postPost(vm.post).then(function(res){
	vm.posts.push(vm.post);
	vm.post = {};
});
};

// vm.getCopy = function(post) {
// 	return angular.copy(post);
// };
//
vm.editPost = function (postID, post) {
HomeFactory.editPost(postID, post).then(function(res){
	vm.editingPost = null;
});
};

vm.deletePost = function(postID) {
HomeFactory.deletePost(postID).then(function() {
		vm.posts.splice(vm.posts.indexOf(postID), 1);
		});
};




	}
})();
