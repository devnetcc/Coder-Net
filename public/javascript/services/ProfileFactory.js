(function() {
	'use strict';
	angular.module('app')
	.factory('ProfileFactory', ProfileFactory);

	function ProfileFactory($http, $q) {
		var o = {};


		o.postProfile = function (user) {
		var q = $q.defer();
		$http.post('api/profiles', user).then(function(res){
			q.resolve(res.data);
		});
		return q.promise;
		};


		o.getProfile = function(user){
			var q = $q.defer();
		$http.get('api/profiles'+ user).then(function(res){
			q.resolve(res.data);
			});
			return q.promise;
		};


		o.editProfileU = function(user) {
		var q = $q.defer();
		$http.put('api/profiles'+ user._id, user).then(function(res){
			q.resolve(res.data);
		});
		return q.promise;
		};


		o.deleteProfile = function(user) {
		var q = q.defer();
		$http.delete('api/profiles'+ user._id).then(function(res){
			q.resolve();
		});
		return q.promise;
		};

		return o;
	}
})();
