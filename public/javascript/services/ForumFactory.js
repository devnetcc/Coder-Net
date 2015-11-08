(function() {
  'use strict';
  angular.module('app')
    .factory('ForumFactory', ForumFactory);


  function ForumFactory($http, $q) {
    var o = {};
    console.log("outside edit function but in factory");

    o.editFPost = function(epost) {
      console.log("in editFpost function in factory");
      var q = $q.defer();
      console.log(epost);
      $http.put('/api/forum/edit/' + epost._id, epost)
        .then(function(res) {
          q.resolve(res.data);
        });
      return q.promise;
    }

    o.deleteFPost = function(fpostID) {
      var q = $q.defer();
      console.log(fpostID);
      $http.delete('/api/forum/' + fpostID)
        .then(function() {
          q.resolve();
        });
      return q.promise;
    }

    o.createforumpost = function(fpost) {
      var q = $q.defer();
      console.log("made it to factory");
      $http.post('/api/forum', fpost)
        .then(function() {
          console.log("made from the route, in factory now");
          q.resolve();
        });
      return q.promise;
    }

    o.getAllPost = function() {
      console.log('getting all posts');
      var q = $q.defer();
      $http.get('/api/forum').then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    }

    o.getPostById = function(id) {
      var q = $q.defer();
      $http.get('/api/forum/' + id).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    }

    o.startFPost = function(id) {
      var q = $q.defer();
      $http.get('/api/forum/edit/' + id).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    }

    return o;
  }

})();
