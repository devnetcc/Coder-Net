(function() {
  'use strict';
  angular.module('app')
    .factory('ForumFactory', ForumFactory);


  function ForumFactory($http, $q) {
    var o = {};

    o.editFPost = function(epost) {
      var q = $q.defer();
      $http.put('/api/forum/edit/' + epost._id, epost)
        .then(function(res) {
          q.resolve(res.data);
        });
      return q.promise;
    };

    o.deleteFPost = function(fpostID) {
      var q = $q.defer();
      $http.delete('/api/forum/' + fpostID)
        .then(function() {
          q.resolve();
        });
      return q.promise;
    };

    o.createforumpost = function(fpost) {
      var q = $q.defer();
      $http.post('/api/forum', fpost)
        .then(function() {
          q.resolve();
        });
      return q.promise;
    };

    o.getAllPost = function() {
      var q = $q.defer();
      $http.get('/api/forum').then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.getPostById = function(id) {
      var q = $q.defer();
      $http.get('/api/forum/' + id).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.startFPost = function(id) {
      var q = $q.defer();
      $http.get('/api/forum/edit/' + id).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.postComments = function(comment, postId) {
      var q = $q.defer();
      $http.post('/api/comments/' + postId , comment).then(function(res){
      q.resolve(res.data);
    });
    return q.promise;
  };

    o.showComments = function(postId) {
      var q = $q.defer();
      $http.get('/api/comments/' + postId).then(function(res) {
        q.resolve(res.data);
        console.log("this is result " + res.data);
      });
      return q.promise;
    };



    return o;
  }
})();
