(function() {
  'use strict';
  angular.module('app')
    .factory('HomeFactory', HomeFactory);

  function HomeFactory($http, $q) {
    var o = {};

    o.postPost = function(post) {
      var q = $q.defer();
      $http.post('api/posts', post).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.reblog = function(post, postcontent) {
      console.log("made it to the factory");
      console.log(post + " post");
      console.log(postcontent + " post content");
      var q = $q.defer();
      $http.post('/api/posts/reblog/' + post, postcontent)
        .then(function(res) {
          console.log("made it back from routes");
          q.resolve(res.data);
        });
      return q.promise;
    };

    o.deletePost = function(id) {
      var q = $q.defer();
      $http.delete('/api/posts/' + id).then(function(res) {
        q.resolve();
      });
      return q.promise;
    };

    //this is for the home page
    o.getAllPosts = function() {
      var q = $q.defer();
      $http.get('/api/posts').then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.getProfilePosts = function(id){
      var q = $q.defer();
      $http.get('/api/posts/userPosts/'+ id).then(function(res){
        q.resolve(res.data);
      });
      return q.promise;
    };


    o.editPost = function(id, post) {
      var q = $q.defer();
      $http.put('/api/posts/' + id, post).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.upvote = function(postId, creator) {
      var q = $q.defer();
      $http.put('/api/posts/upvote/' + postId, {creator: creator}).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };

    o.downvote = function(postId, creator) {
      var q = $q.defer();
      $http.put('/api/posts/downvote/' + postId, {creator: creator}).then(function(res) {
        q.resolve(res.data);
      });
      return q.promise;
    };


    return o;
  }
})();
