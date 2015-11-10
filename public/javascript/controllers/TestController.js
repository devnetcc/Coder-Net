(function() {
	'use strict';
	angular.module('app')
	.controller('TestController', TestController);

	function TestController(HomeFactory, UserFactory,  $state, $window) {
		var vm = this;
		    vm.status = UserFactory.status;
				vm.post = {};



	}
})();
