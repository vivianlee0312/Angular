var track = angular.module('Track', [
	'Track.controllers',
	'Track.services',
	'Track.directives'
])

.config(['$stateProvider', function($stateProvider){

	$stateProvider
	.state('dashboard.quad', {
		'abstract': true,
		'views': {
			'layout@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-quad.html'
			}
		}
	})
	.state('dashboard.quad.summary', {
		'url': '/summary',
		'views': {
			'nav@dashboard.quad': {
				templateUrl: 'app/modules/track/views/view-summary-nav.html',
				'controller': 'SummaryNavController'
			},
			'one@dashboard.quad': {
				'templateUrl': 'app/modules/track/views/view-summary-details.html'
			},
			'two@dashboard.quad': {
				'template': '<chart-wrapper type="pie"></chart-wrapper>'
			},
			'three@dashboard.quad': {
				'template': '<chart-wrapper type="bar"></chart-wrapper>'
			},
			'four@dashboard.quad': {
				'template': '<chart-wrapper type="spline"></chart-wrapper>'
			}
		}
	});
}]);