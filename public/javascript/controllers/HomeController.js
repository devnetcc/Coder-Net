(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	function HomeController(HomeFactory, UserFactory,  $state) {
		var vm = this;
		    vm.status = UserFactory.status;



    vm.contact = function() { // this is for the mock contact form we have.
      $state.go("Home");
    };



	}
})();
