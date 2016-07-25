var dashboard = angular.module('Table', [
	'Table.controllers',
	'Table.services', 
	'Table.directives'
])

.config(['$stateProvider', function($stateProvider){

	$stateProvider
	.state('dashboard.three', {
		'abstract': true,
		'views': {
			'layout@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-three.html'
			}
		}
	})
	.state('dashboard.three.table', {
		'url': '/table',
		'views': {
			'nav@dashboard.three': {
				templateUrl: 'app/modules/table/views/view-summary-nav.html',
				'controller': 'SummaryNavController'
			},
			'one@dashboard.three': {
				'templateUrl': 'app/modules/table/views/view-table-details.html', 
				'controller': 'TableController'
			},
			'two@dashboard.three': {
				'template': '<chart type="pie"></chart>',
				'controller': 'TableController'
			},
			'three@dashboard.three': {
				'template': '<chart type="bar"></chart>',
				'controller': 'TableController' 
			}, 
			
		}
	})
}]);