(function() {
	'use strict';
	angular.module('app')
	.controller('TokenController', TokenController);

	function TokenController(UserFactory,  $state, $stateParams) {
		var vm = this;


var x = $stateParams.token;

UserFactory.setToken(x);

UserFactory.setUser(x);

$state.go('Home');


	}
})();
