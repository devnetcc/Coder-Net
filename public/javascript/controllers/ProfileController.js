(function() {
  'use strict';
  angular.module('app')
     .controller('ProfileController', ProfileController);

    function ProfileController($scope,ProfileFactory, HomeFactory, UserFactory, $state, $stateParams, Notification,$timeout, $q) {

		var vm = this;
		 vm.profile = {};
     vm.status = UserFactory.status;
     vm.user = {};
     vm.person = {};
     vm.mymessages = {};
     vm.post = {};
     vm.post.tags = [];
    vm.colors = ['#f5f5f5','#b9f6ca','#ff80ab','#ffff8d', '#84ffff', '#80d8ff', '#448aff' ,'#b388ff', '#8c9eff', '#ff8a80'];
    vm.profilePosts = {};
    vm.followed = false;
    vm.isPerson;

console.log($stateParams.id + " state params");
console.log(vm.status._id + " vm.status._id");
if($stateParams.id !== vm.status._id){
  vm.isPerson = false;
}
else if($stateParams.id === vm.status._id){
  vm.isPerson = true;
}

vm.primary = function() {
                 Notification('Message Sent!');
             };

ProfileFactory.getTags($stateParams.tag).then(function(res){
  vm.tags = res;
});


vm.getProfile = function(){
ProfileFactory.getProfile($stateParams.id).then(function(res){
	vm.profile = res;

//sets user for ppl logging in with linkedin/fb/etc
if(vm.status.email === undefined && vm.profile.token !== undefined){
  vm.status.email = vm.profile.email;
  vm.status.name = vm.profile.name;
  vm.status.lastName = vm.profile.lastName;
  vm.status.pic = vm.profile.pic;
  vm.status._id = vm.profile._id;
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

};
vm.getProfile();

vm.followOnProfile = function() {
  console.log("made it inside global controller on way to factory");
  UserFactory.followOnProfile($stateParams.id,vm.status)
    .then(function(res){
      console.log("got a new follower");
      vm.getProfile();
  });
}

vm.unFollowOnProfile = function() {
  UserFactory.unFollowOnProfile($stateParams.id, vm.status)
    .then(function(res) {
      // vm.followers.splice(vm.followers.indexOf(), 1);
      vm.getProfile();

    });

};

vm.getProfilePosts = function(){
HomeFactory.getProfilePosts($stateParams.id).then(function(res){
  vm.profilePosts=res;
  for (var i=0; i<vm.profilePosts.length; i++) {
    vm.profilePosts[i].score = vm.profilePosts[i].upvotes.length - vm.profilePosts[i].downvotes.length;

  }

});
};
vm.getProfilePosts();





vm.editProfile = function (profile){
		ProfileFactory.editProfile(profile).then(function(){
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
          extension: ['.pdf','.jpg', 'jpeg','.png', '.gif'],
          asText: true,
          // mimetype: 'image/*', /* Images only */
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
          // var mimetype = blob.mimetype;
          var size = blob.size;
        ProfileFactory.uploadPic(blob,vm.status._id).then(function(res){
          vm.profile.pic = res;
        });
    });
  };


  vm.createPost = function (){
  HomeFactory.postPost(vm.post).then(function(res){
    vm.profilePosts.push(vm.post);
  	vm.post = {};
    vm.getProfilePosts();
  });
  };

  vm.startEdit = function(post) {
    vm.editingPost = angular.copy(post);
  };

  vm.editPost = function (postID, post) {
  HomeFactory.editPost(postID, post).then(function(){
    vm.editingPost = {};
    getProfilePosts();
    });
  };

  vm.deletePost = function(postID) {
  HomeFactory.deletePost(postID).then(function() {
  		vm.profilePosts.splice(vm.profilePosts.indexOf(postID), 1);
  		});
  };

vm.sendMsg = function(){
  UserFactory.sendMsg($stateParams.id, vm.person.inbox.message)
  .then(function(res){
    // vm.mymessages = res;
    // $state.go("Profile({id: $stateParams.id})");
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



	}

})();
