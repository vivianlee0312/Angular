var controller = angular.module('Ball.controllers', [])

.controller('BallController', ['$scope', '$state', 'QuoteService', function($scope, $state, QuoteService){

	$scope.section = "ball";

	$scope.quote = " ";

	$scope.randomizeQuote = function(){
		$scope.quote = QuoteService.getRandomQuote();
	}

}])


.controller('BallFormController', ['$scope', '$state', 'QuoteService', function($scope, $state, QuoteService){

	$scope.quotes = angular.copy(QuoteService.getQuotes()); 

	$scope.saveQuotes = function (){
		QuoteService.updateQuotes($scope.quotes);
		console.log($scope.quotes);

	}


	

}]);


































































// $scope.saveQuotes = function (){
// 		QuoteService.saveQuotes($scope.quotes).then(function(){

// 			$state.go('dashboard.full.ball'); 
// 		}); 
// 	}
