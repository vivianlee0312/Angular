var controllers = angular.module('User.controllers', [])

.controller('LoginController', ['$scope', '$state', 'UserService', function($scope, $state, UserService){

	$scope.loginHandler = function(){

		UserService.login($scope.username, $scope.password).then(function(){
			//login success
			$state.go('dashboard.basic.start');
		}, function(){
			//login failed
			$scope.errorMessage = "FAILED!!!!";
		});

		//go into app, $state.go('start')
		//handle login error
	};

}])

.controller('SignupController',  ['$scope', '$state', 'UserService', function($scope, $state, UserService){

	$scope.signupHandler = function(){
		UserService.signup($scope.firstName, $scope.lastName, $scope.username, $scope.password).then(function(){
			//login success
			$state.go('login');
		}, function(){
			//login failed
			alert("fail.");
		});
	}

}])

.controller('ProfileController', ['$scope', 'UserService', function($scope, UserService){
	$scope.testValue = 100;

	$scope.user = UserService.getUser();
}]);