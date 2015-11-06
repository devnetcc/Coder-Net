(function() {
	'use strict';
	angular.module('app')
	.controller('GlobalController', GlobalController);

	function GlobalController(UserFactory, $state) {
		var vm = this;
		    vm.isLogin = true;
    		vm.user = {};
		    vm.status = UserFactory.status;


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