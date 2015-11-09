(function() {
  'use strict';
  angular.module('app')
    .controller('ProfileController', ProfileController);

	function ProfileController(ProfileFactory, UserFactory, $state, $stateParams) {
		var vm = this;
		 vm.profile = {};
		 vm.profile.languages = [];
     vm.status = UserFactory.status;

ProfileFactory.getProfile($stateParams.id).then(function(res){
	vm.profile = res;
});



vm.goToEdit = function(id, obj){
	$state.go('EditProfile', {id:id, obj:obj});
		};


vm.editProfile = function (profile){
		ProfileFactory.editProfile(profile).then(function(){
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
      console.log('send pic');
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
          // console.log(blob);
          // console.log(vm.status._id);
        ProfileFactory.uploadPic(blob,vm.status._id).then(function(res){
          console.log(res);

          vm.users.pic = res;
          console.log(vm.users.pic +"vm.users2");

        });

    });
  };


	}

})();
