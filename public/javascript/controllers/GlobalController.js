(function() {
  'use strict';
  angular.module('app')
    .controller('GlobalController', GlobalController);


  function GlobalController(UserFactory, $state, $stateParams, $mdSidenav, ProfileFactory) {
    var vm = this;
    vm.isLogin = true;
    vm.user = {};
    vm.luser = {};
    vm.status = UserFactory.status;
    vm.followers = [];
    vm.following = {};
    vm.person = {};

    vm.getProfile = function(){
    ProfileFactory.getProfile(vm.status._id).then(function(res){
    	vm.person = res;
      
    });
  }
    vm.goToEdit = function(id, obj){
    	$state.go('EditProfile', {id:id, obj:obj});
    		};

    vm.forgot = function() {
      UserFactory.forgot(vm.user).then(function() {
        $state.go('Home');
      });
    };

    vm.resetPassword = function() {
      vm.user.id = vm.status._id;
      UserFactory.resetPassword(vm.user).then(function(res) {
        $state.go('Home');
      });

    };


    vm.logout = function() {
      UserFactory.logout();
      $state.go('Home');
    };

    vm.register = function() {
      UserFactory.register(vm.user).then(function() {
        $state.go('Home');
        alert('Please check your email for the verification link.');
      });
    };

    vm.login = function() {
      UserFactory.login(vm.user).then(function() {

        $state.go('Profile', {
          id: vm.status._id
        });
      });
    };


    vm.toggleSidenav = function() {
      $mdSidenav("left").toggle();
    };




    vm.closeAndGo = function(page, id) {
      $mdSidenav("left").toggle();
      if (id) {
        $state.go(page, {
          id: id
        });
      } else {
        $state.go(page);
      }
    };


  }
})();
