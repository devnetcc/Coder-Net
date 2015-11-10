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


//share button
var config = {
  protocol:     // the protocol you'd prefer to use. [Default: your current protocol]
  url:          // the url you'd like to share. [Default: `window.location.href`]
  title:        // title to be shared alongside your link [Default: See below in defaults section]
  description:  // text to be shared alongside your link, [Default: See below in defaults section]
  image:        // image to be shared [Default: See below in defaults section]
  ui: {
    flyout:       // change the flyout direction of the shares. chose from `top left`, `top center`, `top right`, `bottom left`, `bottom right`, `bottom center`, `middle left`, or `middle right` [Default: `top center`]
    button_font:  // include the Lato font set from the Google Fonts API. [Default: `true`]
    buttonText:  // change the text of the button, [Default: `Share`]
    icon_font:    // include the minified Entypo font set. [Default: `true`]
  },
  }

var share = new ShareButton('.share-button', config);


	}
})();
