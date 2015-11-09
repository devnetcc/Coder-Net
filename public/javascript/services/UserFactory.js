(function() {
  'use strict';
  angular.module('app')
    .factory('UserFactory', UserFactory);

  function UserFactory($http, $q) {
    var o = {};
    o.status = {};

    o.register = function(user) {
      var q = $q.defer();
      $http.post('/api/users/register', user).then(function(res) {
        setToken(res.data);
        setUser();
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.login = function(user) {
      var q = $q.defer();
      $http.post('/api/users/login', user).then(function(res) {
        setToken(res.data);
        // setUser();
        var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
        o.status.name = user.name;
        o.status.lastName = user.lastName;
        o.status.pic = user.pic;
        o.status.email = user.email;
        o.status._id = user._id;
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.logout = function() {
      removeToken();
      removeUser();
    };

    function setUser() {
      var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
      o.status.name = user.name;
      o.status.lastName = user.lastName;
      o.status.pic = user.pic;
      o.status.email = user.email;
      o.status._id = user._id;
    }

    function removeUser() {
      o.status.name = null;
      o.status.lastName = null;
      o.status.pic = null;
      o.status.email = null;
      o.status._id = null;
    }

    function getToken() {
      return localStorage.getItem('token');
    }

    function setToken(token) {
      return localStorage.setItem('token', token);
    }

    function removeToken() {
      return localStorage.removeItem('token');
    }

    function urlBase64Decode(str) {
      var output = str.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
        case 0: { break; }
        case 2: { output += '=='; break; }
        case 3: { output += '='; break; }
        default: {
          throw 'Illegal base64url string!';
        }
      }
      return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
    }


    if (getToken()) setUser();

    // o.getAllByUser = function(id) {
    //   var q = $q.defer();
    //   $http.get('/api/users/profile/' + id).then(function(res) {
    // console.log(res);
    //     q.resolve(res.data);
    //   });
    //   return q.promise;
    // };

    return o;
  }
})();
