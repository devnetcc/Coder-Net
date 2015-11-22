// (function() {
//   'use strict';
  angular.module('app')
    .controller('ProfileController',

	function ProfileController($scope,ProfileFactory, HomeFactory, UserFactory, $state, $stateParams, Notification,$timeout, $q) {

		var vm = this;
		 vm.profile = {};
    //  vm.profile.languages.level = [];
     //
		//  vm.profile.languages = [];
     vm.status = UserFactory.status;
     vm.user = {};
     vm.person = {};
     vm.mymessages = {};
     vm.post = {};
     vm.post.tags = [];
    //  vm.profile.profilePosts.tags = [];
    vm.colors = ['#f5f5f5','#b9f6ca','#ff80ab','#ffff8d', '#84ffff', '#80d8ff', '#448aff' ,'#b388ff', '#8c9eff', '#ff8a80'];
    vm.profilePosts = [];
    //
    // vm.labels = ["one",'two','three'];
    // vm.data = [2,3,5];


// Notification.primary('Primary notification');
vm.primary = function() {
                 Notification('Message Sent!');
             };

// var pusher = new Pusher('875def9fc21bdcfe8b72');
// var notificationsChannel = pusher.subscribe('notifications');
// notificationsChannel.bind('new_notification', function(notification){
// var message = notification.message;
// toastr.success(message)
// });
// if(vm.profile.inmessage.length > msgcount){
//   Notification('Message Sent!');
//
// }

// var count = vm.profile.inmessage.length;
// $scope.msgcount = count;
// $scope.$watch('vm.profile.inmessage.length', function(newValue, oldValue){
//    if (newValue > oldValue) { return; }
//   Notification('Wait what!');
// });

ProfileFactory.getTags($stateParams.tag).then(function(res){
  vm.tags = res;
});


ProfileFactory.getProfile($stateParams.id).then(function(res){
	vm.profile = res;


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

console.log($stateParams);

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
    vm.profile.msgcount++;
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



      // var yTextPadding = 20;
      // svg.selectAll(".bartext")
      // .data(data)
      // .enter()
      // .append("text")
      // .attr("class", "bartext")
      // .attr("text-anchor", "middle")
      // .attr("fill", "white")
      // .attr("x", function(d,i) {
      //     return x(i)+x.rangeBand()/2;
      // })
      // .attr("y", function(d,i) {
      //     return height-y(d)+yTextPadding;
      // })
      // .text(function(d){
      //      return d;
      // });

	})
  .directive('bars', function ($parse) {
     return {
        restrict: 'E',
        replace: true,
        template: '<div id="chart"></div>',
        link: function (scope, element, attrs) {
          var data = attrs.data.split(','),
          chart = d3.select('#chart')
            .append("div").attr("class", "chart")
            .selectAll('div')
            .data(data).enter()
            .append("div")
            .transition().ease("elastic")
            .style("width", function(d) { return d + "%"; })
            .text(function(d) { return d + "%"; });
        }
     };
  });
// })();
