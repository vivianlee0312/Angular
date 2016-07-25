var services = angular.module('User.services', [])

.factory('UserService', ['$http', '$q', 'localStorageService', function($http, $q, localStorageService){
	return {
		user: {},
		getUser: function(){
			if(!this.user.token){
				this.user = localStorageService.get('user');
			}
			return this.user;
		},
		setUser: function(user){
			this.user = user;
			localStorageService.set('user', user);
		},
		login: function(username, password){
			var defer = $q.defer(),
				self  = this;

			console.log("Login from UserService");

			//call ajax to login
			$http({
				'method': 'POST',
				'url': 'http://localhost:3000/login',
				'data': {
					'username': username,
					'password': password
				}
			}).then(function(response){

				self.setUser(response.data);

				defer.resolve(response);

			}, function(error){
				
				defer.reject(error);

			});
			
			return defer.promise;
		},
		signup: function(fn, ln, un, pw){
			var defer = $q.defer();

			//call ajax to login
			$http({
				'method': 'POST',
				'url': 'http://localhost:3000/signup',
				'data': {
					'firstName': fn,
					'lastName': ln,
					'username': un,
					'password': pw
				}
			}).then(function(response){

				defer.resolve(response);

			}, function(error){
				
				defer.reject(error);

			});

			return defer.promise;
		}
	};
}]);