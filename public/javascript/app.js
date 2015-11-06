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
        	url: '/profile',
        	templateUrl: '/views/profile.html'
         })
        .state('Forum', {
        	url: '/forum',
        	templateUrl: 'views/forum.html'
         })
        .state('EditForum', {
        	url: '/editforum',
        	templateUrl: 'views/editForum.html'
         })
        .state('ForumPost', {
        	url: '/forumpost',
        	templateUrl: 'views/forumPost.html' 
      	 })
        .state('RegLog', {
        	url: '/reglog',
        	templateUrl: 'views/reglog.html'
      	 })
        .state('EditProfile', {
        	url: '/editprofile',
        	templateUrl: 'views/editprofile.html'
        })
        .state('CreateProfile', {
          url: '/createprofile',
          templateUrl: 'views/createprofile.html'          	       	
		});
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push('AuthInterceptor');

	}
})();
