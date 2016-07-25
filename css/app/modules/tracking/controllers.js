var controller = angular.module('Tracking.controllers', [])

.controller('SummaryNavController', ['$scope', 'DataService', 'ChartService', function($scope, DataService, ChartService){

	$scope.totalHandler = function(){
		DataService.getGDPTotal().then(function(data){

			ChartService.refreshCharts('gdpTotal');

		});
	}

	$scope.capitaHandler = function(){
		DataService.getGDPPerCapita().then(function(data){

			ChartService.refreshCharts('gdpPerCapita');

		});
	}

	$scope.growthHandler = function(){
		DataService.getGDPGrowth().then(function(data){

			ChartService.refreshCharts('gdpGrowth');

		});
	}

	$scope.totalHandler();

}])

.controller('TableController', ['$scope', 'DataService' ,'ChartService', function($scope, DataService, ChartService){
	
	$scope.format = DataService.formatDollars;

	DataService.getGDPTop20().then(function(data){

		ChartService.refreshCharts('gdpTop20');

		$scope.countries = ChartService.gdpTop20;

	});

	$scope.setCharts = function(country){

		ChartService.setCustomData('gdpTop20', [country]);
	}
}]);