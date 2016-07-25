var directives = angular.module('Count.directives',[])

.directive('customButton', function(){
	return{
		restrict: 'E',
		template: '<button id="test">{{text}}</button>',
		controller: ['$scope','$element', '$attrs', function($scope, $element, $attrs){

			// $scope.text="Custom Button from $scope";

			console.log($element);

			$scope.destruct= function(){
				//kills element: this.delete()
				// angular.element($element).remove()
				angular.element(customDir).remove()





			};

			window.customDir= $element; //accessable from the window
		}],

		link: function(scope, element, attrs ){
			scope.text= "Custom Button from $scope";
		}
	}

});

// A: <div class= "custom-buttom">
// E:<custom-buttom> </custom-button>