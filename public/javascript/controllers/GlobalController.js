(function() {
  'use strict';
  angular.module('app')
    .controller('GlobalController', GlobalController);


  function GlobalController(UserFactory, $state, $stateParams, $mdSidenav) {
    var vm = this;
    vm.isLogin = true;
    vm.user = {};
    vm.luser = {};
    vm.status = UserFactory.status;

      // vm.linkLogin = function(){
      //     UserFactory.getLUser().then(function(){
      //       vm.status = res;
      //     });``
      // };
      // vm.linkLogin = function(){
      //   console.log(vm.status.name + " vm.user");
      //     UserFactory.getLUser().then(function(){
      //       vm.status = res;
      //     });
      // }

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
        $state.go('Home');
      });
    };

    vm.login = function() {
      UserFactory.login(vm.user).then(function() {
        console.log(vm.status);
        console.log(vm.status.userName);
      $state.go('Profile', {id: vm.status._id});
      });
    };


    vm.toggleSidenav = function() {
      $mdSidenav("left").toggle();
    };

// conditional statement
    vm.followOnProfile = function(){
      console.log($stateParams);
      if($stateParams === vm.status) {
      return null;
    }
      UserFactory.followOnProfile($stateParams.id,vm.status)
        .then(function(res){
      console.log(vm.status);
          console.log("got a new follower");
          //change follow button to unfollow button
      });
    };

    if (localStorage) {
  // LocalStorage is supported!
  // vm.profile.followers = vm.status;
  console.log(vm.status);
    } else {
      console.log('awww!');
      // No support. Use a fallback such as browser cookies or store on the server.
    }
    vm.unFollowProfile = function() {
      UserFactory.unFollowProfile($stateParams.id, vm.profile)
      .then(function(res) {
        console.log(res);
        vm.following.splice(vm.following.indexOf(followers),1);
      });
    };

vm.closeAndGo = function(page, id){
  $mdSidenav("left").toggle();
  if (id){
    $state.go(page, {id: id});
  } else {
    $state.go(page);
  }
};


  }
})();
