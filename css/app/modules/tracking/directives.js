var directives = angular.module('Tracking.directives', [])

.directive('chart', function() {

	var restrict = 'E',
		template = '<highchart id="chart1" config="chartConfig" style="max-height: 100%; overflow: hidden"></highchart>',
		controller = ['$scope', '$attrs', '$element', 'ChartService', function($scope, $attrs, $element, ChartService){
			$scope.refresh = function(dataType){
				var configFn  = ChartService[$attrs.type + "Config"];

				$scope.chartConfig = configFn(dataType, ChartService, computeSize($attrs.layout, $element), computeRange($attrs.range));
			};

			ChartService.employChart($element);
		}];

	function computeRange(range){
		if(range == "5"){
			return [2010, 2014];
		} else {
			return [2006, 2014];
		}
	}

	function computeSize(layout, el){
		if(layout == "quad"){
			return {
				height: $(el[0]).parent().height(),
				width: $(el[0]).parent().width()
			}
		} else {
			return {
				height: $(el[0]).parent().parent().height() - 15,
				width: $(el[0]).parent().parent().width()
			}
		}
	}

	return {
		restrict: restrict,
		template: template,
		controller: controller
	};
});