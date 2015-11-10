(function() {
  'use strict';
  angular.module('app')
    .controller('GlobalController', GlobalController);

  function GlobalController(UserFactory, $state, $stateParams) {
    var vm = this;
    vm.isLogin = true;
    vm.user = {};
    vm.status = UserFactory.status;

console.log(vm.status.email + " vm.status.email");
    	vm.forgot = function() {
    		UserFactory.forgot(vm.user).then(function() {
    			$state.go('Home') ;
    		}) ;
    	} ;

    	vm.resetPassword = function() {
    		vm.user.id = vm.status._id ;
    		UserFactory.resetPassword(vm.user).then(function(res) {
    			$state.go('Home') ;
    		}) ;

    	} ;


    vm.logout = function() {
      UserFactory.logout();
      $state.go('Home');
    };

    vm.register = function() {
      UserFactory.register(vm.user).then(function() {
        $state.go('Profile');
      });
    };

    vm.login = function() {
      UserFactory.login(vm.user).then(function() {
        $state.go('Profile');
      });
    };

  }
})();
