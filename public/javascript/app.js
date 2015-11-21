(function() {
	'use strict';
	angular.module('app', ['ui.router', 'ngMaterial','ui.bootstrap','720kb.socialshare','ui.tinymce','ngSanitize'])
	.config(Config);

	function Config($stateProvider, $urlRouterProvider, $httpProvider) {
		$stateProvider
		.state('Home',{
			url: '/home/:id',
			templateUrl: 'views/home.html'
        })
				.state('About', {
        	url: '/about',
        	templateUrl: '/views/about.html'
				})
				.state('Message', {
	       	url: '/message/:id',
	       	templateUrl: '/views/message.html'
        }).state('MessageCenter', {
	       	url: '/messagecenter/:id',
	       	templateUrl: '/views/messagecenter.html'
        })
        .state('Contact', {
        	url: '/contact',
        	templateUrl: 'views/contact.html'
         })
        .state('Profile', {
        	url: '/profile/:id',
        	templateUrl: '/views/profile.html'
         })
        .state('Forums', {
        	url: '/forums',
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
				 .state('CreateForumPost', {
         	url: '/createforumpost',
         	templateUrl: 'views/createforumPost.html'
				})
				.state('EditFPost', {
					url: '/editforumpost/:id',
				  templateUrl: 'views/editfpost.html'
				  })
        .state('RegLog', {
        	url: '/reglog',
        	templateUrl: 'views/reglog.html'
      	 })
        .state('EditProfile', {
        	url: '/editprofile/:id',
        	templateUrl: 'views/editprofile.html'
        })
				.state('PassReset', {
					url: '/reset',
					templateUrl: 'views/passwordReset.html'
				})
				.state('Forgot', {
					url: '/forgot',
					templateUrl: 'views/forgot.html'
				})
				.state('Followers', {
					url: '/profile/followers/:id',
					templateUrl: 'views/followers.html'
				})
				.state('Following', {
					url: '/profile/following/:id',
					templateUrl: 'views/following.html'
				})
				.state('Token', {
					url: '/token/:token',
					templateUrl: 'views/token.html'
				});
		$urlRouterProvider.otherwise('/');
		$httpProvider.interceptors.push('AuthInterceptor');

	}
})();
