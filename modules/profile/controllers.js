var controllers= angular.module('Profile.controllers', [])

.controller('UserDetailsController' , ['$scope', '$state','UserService', function($scope, $state, UserService){


	
	// $scope.user= UserService.getUser();
	
	$scope.firstName= UserService.getUser().firstName;
	$scope.edit= false;
	$scope.back= false;


	$scope.lastName= UserService.getUser().lastName;
	// $scope.edit= false;
	
	$scope.username= UserService.getUser().username;
	$scope.password= UserService.getUser().password;


	$scope.user= {};
	$scope.saveHandler= function(user){
		

		UserService.save($scope.firstName, $scope.lastName).then(function(){
			// state.go('dashboard.profile');

			         

			// $scope.firstName= "123";
			// $scope.lastName= "123";


		}, function(){
			alert("save failed!");
		});
	};




}]);

// .controller('SaveController', ['$scope', '$state', 'UserService', function($scope, $state, UserService){

// 	$scope.saveHandler= function(){
// 		UserService.save($scope.firstName, $scope.lastName).then(function(){
// 			state.go('dashboard.profile');
// 		}, function(){
// 			alert("save failed!");
// 		});
// 	};

// }]);