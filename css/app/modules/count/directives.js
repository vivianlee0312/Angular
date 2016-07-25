var directives = angular.module('Count.directives', [])

.directive('customButton', function(){
	return {
		restrict: 'E',
		template: '<button id="test">{{text}}</button>',
		controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs){

			//$scope.text = "Custom Button from $scope";

			$scope.destruct = function(){
				angular.element(customDir).remove();
			};

			window.customDir = $element;

		}],
		link: function(scope, element, attrs){
			scope.text = "Custom Button from $scope";
		}
	}
});