var directives = angular.module('Table.directives', [])
.directive('chart', function(){

	return {

		restrict: 'E',
		template: '<highchart id="chart1" config="chartConfig" style="max-height: 100%; overflow: hidden"></highchart>',
		controller: ['$scope', '$attrs', '$element', 'TableChartService', function($scope, $attrs, $element, TableChartService){
				$scope.refresh = function(dataName){
					var configFn  = TableChartService[$attrs.type + "Config"];


					$scope.chartConfig = configFn(dataName, TableChartService);
				};

		 	TableChartService.employChart($element);
		}]



	};	
});