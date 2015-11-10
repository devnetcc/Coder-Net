(function() {
  'use strict';
  angular.module('app')
    .controller('ProfileController', ProfileController);

	function ProfileController(ProfileFactory, UserFactory, $state, $stateParams) {
		var vm = this;
		 vm.profile = {};
		 vm.profile.languages = [];


ProfileFactory.getProfile($stateParams.id).then(function(res){
	vm.profile = res;
  console.log(vm.profile);
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

	}

})();
