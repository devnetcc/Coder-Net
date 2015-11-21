(function() {
  'use strict';
  angular.module('app')
    .controller('ProfileController', ProfileController);

	function ProfileController(ProfileFactory, HomeFactory, UserFactory, $state, $stateParams) {

		var vm = this;
		 vm.profile = {};
		//  vm.profile.languages = [];
     vm.status = UserFactory.status;
     vm.user = {};
     vm.person = {};
     vm.mymessages = {};
     vm.post = {};
    vm.colors = ['#f5f5f5','#b9f6ca','#ff80ab','#ffff8d', '#84ffff', '#80d8ff', '#448aff' ,'#b388ff', '#8c9eff', '#ff8a80'];
    vm.profilePosts = [];



ProfileFactory.getProfile($stateParams.id).then(function(res){
	vm.profile = res;
  console.log(vm.profile.email + "1");
// console.log(vm.status.email + " vm.status.email");
// console.log(vm.profile.token + " vm.profile.token");

//sets user for ppl logging in with linkedin/fb/etc
if(vm.status.email === undefined && vm.profile.token !== undefined){
  vm.status.email = vm.profile.email;
  vm.status.name = vm.profile.name;
  vm.status.lastName = vm.profile.lastName;
  vm.status.pic = vm.profile.pic;
  vm.status._id = vm.profile._id;
  vm.profilePosts = vm.profile.profilePosts;
}

switch (vm.profile.role) {
  case 'Newbie':
  vm.profile.badge = "/imgs/badges/newbie.png";
  break;
  case 'Student':
  vm.profile.badge = "/imgs/badges/student.png";
  break;
  case 'Recent Graduate':
    vm.profile.badge = "/imgs/badges/grad.png";
    break;
  case 'Mentor':
    vm.profile.badge = "/imgs/badges/mentor.png";
    break;
    case 'Recruiter':
    vm.profile.badge = "/imgs/badges/recruiter.png";
    break;
    default:
    vm.profile.badge = "/imgs/badges/coder.png";
}
});
// console.log(vm.profile.email + "2");

vm.goToEdit = function(id, obj){
	$state.go('EditProfile', {id:id, obj:obj});
		};


vm.editProfile = function (profile){
		ProfileFactory.editProfile(profile).then(function(){
      console.log(vm.profile.role);
      switch (vm.profile.role) {
        case 'Newbie':
        vm.profile.badge = "/imgs/badges/newbie.png";
        break;
        case 'Student':
        vm.profile.badge = "/imgs/badges/student.png";
        break;
        case 'Recent Graduate':
          vm.profile.badge = "/imgs/badges/grad.png";
          break;
        case 'Mentor':
          vm.profile.badge = "/imgs/badges/mentor.png";
          break;
          case 'Recruiter':
          vm.profile.badge = "/imgs/badges/recruiter.png";
          break;
          default:
          vm.profile.badge = "/imgs/badges/coder.png";
      }
			$state.go('Profile', {id: $stateParams.id});
		});
};


vm.deleteProfile = function(profile) {
	ProfileFactory.deleteProfile(vm.profile._id).then(function(){
		UserFactory.logout();
		$state.go("Home");
	});
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
          var url = blob.url;
          var id = blob.id;
          var isWriteable = blob.isWriteable;
          var mimetype = blob.mimetype;
          var size = blob.size;
        ProfileFactory.uploadPic(blob,vm.status._id).then(function(res){
          vm.profile.pic = res;
        });
    });
  };



  vm.createPost = function (){
  HomeFactory.postPost(vm.post, vm.profile).then(function(res){
    vm.profile.profilePosts.push(vm.post);
  	vm.post = {};
  });
  };
  vm.startEdit = function(post) {
    vm.editingPost = angular.copy(post);
  };

  vm.editPost = function (postID, post) {
  HomeFactory.editPost(postID, post).then(function(res){
    ProfileFactory.getProfile($stateParams.id).then(function(res){
    	vm.profile = res;
      vm.profilePosts = vm.profile.profilePosts;
    });
    vm.editingPost = {};
  });
  };

  vm.deletePost = function(postID) {
  HomeFactory.deletePost(postID).then(function() {
  		vm.profile.profilePosts.splice(vm.profile.profilePosts.indexOf(postID), 1);
  		});
  };

vm.sendMsg = function(){
  UserFactory.sendMsg($stateParams.id, vm.person.inbox.message)
  .then(function(res){
    // vm.mymessages = res;
    // $state.go("Profile({id: $stateParams.id})");
  })
}

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
            HomeFactory.upvote(post._id, vm.status._id);
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
            HomeFactory.downvote(post._id, vm.status._id);
          }
        }
      };





	}
})();
