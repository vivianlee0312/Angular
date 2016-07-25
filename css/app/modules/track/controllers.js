var controller = angular.module('Track.controllers', [])

.controller('SummaryNavController', ['$scope', '$timeout', 'DataService', 'ChartService', function($scope, $timeout, DataService, ChartService){

	/**
	*	On click event handlers for the "Summary Nav" buttons
	**/

	$scope.totalHandler = function(){
		DataService.getGDPTotal().then(function(){
			ChartService.refreshCharts('gdpTotal');
		});
	}

	$scope.capitaHandler = function(){
		
	}

	$scope.growthHandler = function(){
		
	}

	//get data to set default state of the dashboard

	//$timeout(function(){

		$scope.totalHandler();

	//}, 1);

}]);