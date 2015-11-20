(function() {
  'use strict';
  angular.module('app')
    .factory('UserFactory', UserFactory);

  function UserFactory($http, $q) {
    var o = {};
    o.status = {};
    var token = '';
    o.setToken = setToken;
    o.setUser = setUser;

    function getToken() {
      return localStorage.getItem('token');
    }

    function setToken(token) {
      return localStorage.setItem('token', token);
    }

    function removeToken() {
      return localStorage.removeItem('token');
    }

    function externalLogin(token) {
      setToken(token);
      setUser();
    }


    function urlBase64Decode(token) {
      // token = getToken();
      if(token ===  undefined){
        // return false;
        return;
      }
      else {
      var output = token.replace(/-/g, '+').replace(/_/g, '/');
      switch (output.length % 4) {
        case 0:
          {
            break;
          }
        case 2:
          {
            output += '==';
            break;
          }
        case 3:
          {
            output += '=';
            break;
          }
        default:
          {
            throw 'Illegal base64url string!';
          }
      }

      return decodeURIComponent(escape(window.atob(output))); //polifyll https://github.com/davidchambers/Base64.js
    }
    }

    o.register = function(user) {
      var q = $q.defer();
      $http.post('/api/reset/register', user).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.forgot = function(user) {
			var q = $q.defer() ;
			$http.post('/api/reset/forgot', user).success(function(res) {
				q.resolve() ;
			}) ;

			return q.promise ;
		} ;

    o.resetPassword = function(editedUser) {
    var q = $q.defer() ;
    $http.put('/api/reset/resetPassword/' , editedUser).success(
      function(res) {
        q.resolve(res) ;
      }) ;
    return q.promise ;
  };

    o.login = function(user) {
      var q = $q.defer();
      $http.post('/api/users/login', user).then(function(res) {
        setToken(res.data);
        setUser();
        q.resolve(res.data);
      });
      return q.promise;
    };


    o.logout = function() {
      removeToken();
      removeUser();
    };

    o.followOnProfile = function(celebrityId, followerObj){
      var q = $q.defer();
      $http.put('/api/users/followOnProfile/' +celebrityId, followerObj)
      .then(function(res){
        console.log("came back from routes");
        q.resolve(res.data);
      });
      return q.promise;
    };
    o.unFollowProfile = function(profileId, followerID) {
      console.log(profileId); //profile you follow
      console.log(followerID); //the follower
      var q = $q.defer();
      $http.put('/api/users/unfollowProfile/' + profileId , followerID).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    }

    o.followOnPost = function(celerityId, followerObj){
      var q = $q.defer();
      $http.put('/api/users/followOnPost/' +celerityId, followerObj)
      .then(function(res){
        q.resolve(res.data);
      });
      return q.promise;
    };

    function setUser() {

      var user = JSON.parse(urlBase64Decode(getToken().split('.')[1]));
      console.log(user);
      o.status.name = user.name;
      o.status.userName = user.userName;
      o.status.lastName = user.lastName;
      o.status.pic = user.pic;
      o.status.email = user.email;
      o.status._id = user._id;
    }

    function removeUser() {
      o.status.name = null;
      o.status.userName = null;
      o.status.lastName = null;
      o.status.pic = null;
      o.status.email = null;
      o.status._id = null;
    }


    function getAuth() {
    var auth = {
      headers: {
        Authorization: "Bearer " +
        localStorage.getItem("token")
      }
    };
    return auth ;
  }

    if (getToken()) setUser();


    return o;
  }
})();
