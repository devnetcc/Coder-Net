(function() {
  'use strict';
  angular.module('app')
    .controller('PassResetController', PassResetController);
  // PassResetController.$inject = ['$state', '$http', '$stateParams', '$timeout', '$window', 'UserFactory'];
  function PassResetController($state, $http, $stateParams, $timeout, $window, UserFactory) {
    var vm = this;
    vm.user = {};
    vm.newPassword;
    vm.confirmPassword;
    vm.errMsg = '';
    vm.okToSend = false;
    vm.sendEmail = sendEmail;
    vm.changePassword = changePassword;

console.log('inside PassResetController');
    vm.sendEmail = function() { //func top
      if (!vm.email) {
        vm.errMsg = 'No input!';
        $timeout(function() {
          vm.errMsg = '';
        }, 1000);
        return;
      } // all clear
      vm.okToSend = true;
        console.log('sending email');
      $http.post("/api/reset", {
          email: vm.email
        })
        .then(function(responseSuccess) {
          vm.okToSend = false;
          vm.errMsg = "Success! Email Sent!!! Check your email, please.\nClosing so you can login..";
          $timeout(function() {
          console.log('waiting for email');
            vm.errMsg = '';
          }, 2000);
        }, function(responseError) {
          vm.okToSend = false;
          vm.errMsg = responseError.data;
          $timeout(function() {
            vm.errMsg = '';
          }, 2000);
        });
    } ;
    // func bott
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
            vm.errMsg = 'Passwords do not match!';
          } else {
          vm.okToSend = true;
          $http.post('/api/rest',{
            userId: token.user.id,
            newPassword: vm.newPassword
          }).then(function(res) {
            vm.okToSend = false;
            vm.errMsg = res.data.success;
            $timout(function() {
              $state.go('Home');
            }, 500);
          }, function(res) {
            console.log(res.data);
          });
          }
        }
      }
    }


  }
})();

// function ResestPassword() {
//   var token = JSON.parse(urlBase64Decoder(stateParams.info.split('.')[1]));
//   if (token.expirationDate < Date.now()) {
//     vm.errMsg = 'This link has expired already!';
//   } else {
//     vm.errMsg = 'This link is still valid';
//     if (!vm.newPassword || !vm.confirmPassword) {
//       vm.errMsg = 'Password is missing!';
//     } else {
//       if (vm.newPassword !== vm.confirmPassword) {
//         vm.errMsg = 'Passwords do not match!'
//       } else {
//         vm.okToSend = true;
//         $http.post('/api/rest', {
//           userId: token.user.id,
//           newPassword: vm.newPassword
//         }).then(function(res) {
//           vm.okToSend = false;
//           vm.errMsg = res.data.success;
//           $timout(function() {
//             $state.go('Home')
//           }, 500);
//         }, function(res) {
//           console.log(res.data);
//         })
//       }
//     }
//   }
// }
//
//
//
// }
// })();
