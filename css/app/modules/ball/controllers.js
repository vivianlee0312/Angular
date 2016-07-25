var controller = angular.module('Ball.controllers', [])

.controller('BallController', ['$scope', 'QuoteService', function($scope, QuoteService){

	$scope.quote = " ";

	$scope.randomizeQuote = function(){
		$scope.quote = QuoteService.getRandomQuote();
	}

}])

.controller('QuoteEditorController', ['$scope', '$state', 'QuoteService', function($scope, $state, QuoteService){

	$scope.quotes = angular.copy(QuoteService.getQuotes());

	$scope.saveQuotes = function(){
		QuoteService.saveQuotes($scope.quotes).then(function(){
			$state.go('dashboard.full.ball');
		});
	}

}]);