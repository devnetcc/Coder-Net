(function(){
  'use strict';
  angular.module('app')
  .controller('PassResetController', PassResetController);
  PassResetController.$inject = ['$state', '$http', '$statParams', '$timeout', '$window'];
  function PassResetController($state, $http, $statParams, $timeout, $window) {
    var vm = this;
    vm.newPassword;
    vm.confirmPassword;
    vm.errMsg = '';
    vm.okToSend = false;

    function ResestPassword() {
      var token = JSON.parse(urlBase64Decoder(stateParams.info.split('.')[1]));
      if (token.expirationDate < Date.now()) {
        vm.errMsg = 'This link has expired already!';
      } else {
        vm.errMsg = 'This link is still valid';
        if(!vm.newPassword || !vm.confirmPassword) {
          vm.errMsg = 'Password is missing!';
        } else {
          if (vm.newPassword !== vm.confirmPassword) {
            vm.errMsg = 'Passwords do not match!'
          } else {
          vm.okToSend = true;
          $http.post('/api/rest',{
            userId: token.user.id,
            newPassword: vm.newPassword
          }).then(function(res) {
            vm.okToSend = false;
            vm.errMsg = res.data.success;
            $timout(function() {
              $state.go('Home')
            }, 500);
          }, function(res) {
            console.log(res.data);
          })
          }
        }
      }
    }


  }
})();
