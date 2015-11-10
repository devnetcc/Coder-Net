(function() {
	'use strict';
	angular.module('app')
	.factory('ProfileFactory', ProfileFactory);

	function ProfileFactory($http, $q) {
		var o = {};


		o.getProfile = function(id){
			var q = $q.defer();
		$http.get('api/users/'+ id).then(function(res){
			q.resolve(res.data);
			});
			return q.promise;
		};

		o.editProfile = function(profile) {
			console.log(profile);

		var q = $q.defer();
		$http.put('api/users/'+ profile._id, profile).then(function(res){
			q.resolve(res.data);
		});
		return q.promise;
		};

		o.deleteProfile = function(id) {
		var q = $q.defer();
		$http.delete('api/users/'+ id).then(function(res){
			q.resolve();
		});
		return q.promise;
		};

		o.uploadPic = function(pic,userId){
			console.log(pic);
			console.log(userId);
			var q = $q.defer();
			// console.log("heading to route");
			// console.log(pic);
			$http.put('/api/users/' + userId + '/pic', pic).then(function(res){
				console.log(res);
			q.resolve(res.data);
		});
		return q.promise;
		}





		return o;
	}
})();
