(function() {
  'use strict';
  angular.module('app')
    .controller('ForumController', ForumController);

  function ForumController(ForumFactory, UserFactory, $state, $stateParams) {
    var vm = this;
    vm.status = vm.UserFactory;
    vm.topics = ["General", "Job Board", "Interview Prep", "Code Questions", "Meetups", "Bootcamp Reviews"];
    vm.fpost = {};


    if ($stateParams.id) {
      ForumFactory.getPostById($stateParams.id).then(function(res) {
        vm.apost = res;
      });
    }

    vm.cancelEdit = function() {
      ForumFactory.getPostById($stateParams.id).then(function(res) {
        vm.apost = res;
        $state.go("ForumPost", {
          id: $stateParams.id
        });
      });
    };

    ForumFactory.startFPost($stateParams.id).then(function(res) {
      vm.epost = res;
    });

    vm.getPostsByTopic = function(topic) {
      ForumFactory.getPostsByTopic(topic).then(function(res) {
        vm.topicPosts = res;
      });
    };

    vm.createforumpost = function() {
      ForumFactory.createforumpost(vm.fpost)
        .then(function() {
          $state.go('Forums');
        });
    };

    vm.editFPost = function() {
      ForumFactory.editFPost(vm.epost).then(function() {
        $state.go('ForumPost', {
          id: $stateParams.id
        });
      });
    };

    vm.deleteFPost = function(fpost) {
      vm.forumPosts.splice(vm.forumPosts.indexOf(fpost), 1);
      ForumFactory.deleteFPost(fpost._id);
      $state.go('Forums');
    };
    // ---------------------

    vm.postComments = function() {
      ForumFactory.postComments(vm.newComment, $stateParams.id).then(function(res) {
        vm.comments.push(vm.newComment);
        vm.newComment = {};
        $state.go('ForumPost', {
          id: $stateParams.id
        });
      });
    };

    vm.showComments = function() {
      ForumFactory.showComments($stateParams.id).then(function(res) {
        vm.comments = res;
        // $state.go('ForumPost', {id: $stateParams.id});
      });
    };
    vm.showComments();

  }

})();
