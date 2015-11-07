(function() {
  'use strict';
  angular.module('app')
    .controller('ProfileController', ProfileController);

  function ProfileController(ProfileFactory, UserFactory, $state) {
    var vm = this;
    vm.status = UserFactory.status;
    vm.user = {}; // this needs to be populated
    vm.user.languages = [];


    ProfileFactory.getProfile(vm.status.user).then(function(res) {
      vm.user = res;
    })

    vm.postProfile = function() {
      ProfileFactory.postProfile(vm.user).then(function(res) {
        $state.go("Profile");
      });
    };



    vm.editProfile = function(id, obj) {
      localStorage.setItem('tempPet', JSON.stringify(obj));
      $state.go('EditProfile', {
        id: id
      });
    };



    vm.deleteProfile = function(user) {
      // have an alert box asking the user if they are sure they want to delete
      ProfileFactory.deleteProfile(user).then(function() {
        $state.go("Home");
      });
    };


  }
})();
