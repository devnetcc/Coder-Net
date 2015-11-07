(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial'])
	.config(Config);
	function Config($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider
		.state('Home',{
			url: '/',
			templateUrl: 'views/home.html'
        })
		.state('About', {
        	url: '/about',
        	templateUrl: '/views/about.html'
         })
        .state('Contact', {
        	url: '/contact',
        	templateUrl: 'views/contact.html'
         })
        .state('Profile', {
        	url: '/profile/:id',
        	templateUrl: '/views/profile.html'
         })
        .state('Forum', {
        	url: '/forum',
        	templateUrl: 'views/forum.html'
         })
        .state('EditForum', {
        	url: '/editforum/:id',
        	templateUrl: 'views/editForum.html'
         })
        .state('ForumPost', {
        	url: '/forumpost/:id',
        	templateUrl: 'views/forumPost.html'
      	 })
        .state('RegLog', {
        	url: '/reglog',
        	templateUrl: 'views/reglog.html'
      	 })
        .state('EditProfile', {
        	url: '/editprofile/:id',
        	templateUrl: 'views/editprofile.html'
		});
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push('AuthInterceptor');

	}
})();
