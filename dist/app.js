var app = angular.module('FirstApp', [
	'ui.router',
	'ngAnimate',
	'ngAria',
	'ngMaterial',
	'angular-loading-bar',
	'LocalStorageModule',
	'highcharts-ng',

	'Dashboard',
	'Count',
	'User',
	'Ball',
	'Track',
	'Table'
])


.config(['$stateProvider', '$urlRouterProvider', 'localStorageServiceProvider', function($stateProvider, $urlRouterProvider, localStorageServiceProvider){

	localStorageServiceProvider
	.setPrefix('myfirstapps')
	.setStorageType('localStorage');

	//Setup redirects or default paths
	$urlRouterProvider.when('', '/login');

	//Define states of application
	$stateProvider
	.state('login', {
		'url': '/login',
		'views': {
			'container': {
				'templateUrl': 'app/modules/user/views/view-login-container.html',
				'controller': 'LoginController'
			}
		}
	})
	.state('signup', {
		'url': '/signup',
		'views': {
			'container': {
				'templateUrl': 'app/modules/user/views/view-signup-container.html',
				'controller': 'SignupController'
			}
		} 
	})
	.state('dashboard', {
		'abstract': true,
		'views': {
			'container': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-container.html'
			},
			'nav@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-nav.html',
				'controller': 'NavController'
			}
		}
	})
	.state('dashboard.basic', {
		'abstract': true,
		'views': {
			'layout@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-basic.html'
			}
		}
	})
	.state('dashboard.full', {
		'abstract': true,
		'views': {
			'layout@dashboard': {
				'templateUrl': 'app/modules/dashboard/views/view-layout-full.html'
			}
		}
	})
	.state('dashboard.full.ball', {
		'url': '/ball',
		'views': {

			'main@dashboard.full': {
				'templateUrl': 'app/modules/ball/views/view-ball-main.html',
				'controller': 'BallController'
			},

		}
	})

	.state('dashboard.full.quote', {
		'url': '/quote',
		'views': {

			'main@dashboard.full': {
				'templateUrl': 'app/modules/ball/views/view-ball-quote.html',
				'controller': 'BallFormController'
			},
		}
	})

	.state('dashboard.basic.start', {
		'url': '/start',
		'views': {
			'header@dashboard.basic': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-header.html',
				// 'controller': 'HeaderController'
			},
			'main@dashboard.basic': {
				'template': 'Click <code>Counter</code> in nav on left to test out routing.'
			}
		}
	})
	.state('dashboard.basic.count', {
		'url': '/count',
		'views': {
			'header@dashboard.basic': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-header.html',
				'controller': 'HeaderController'
			},
			'main@dashboard.basic': {
				'templateUrl': 'app/modules/count/views/view-count.html'
			}
		}
	})
	.state('dashboard.basic.profile', {
		'url': '/profile',
		'views': {
			'header@dashboard.basic': {
				'templateUrl': 'app/modules/dashboard/views/view-dashboard-header.html',
				'controller': 'HeaderController'
			},
			'main@dashboard.basic': {
				'templateUrl': 'app/modules/user/views/view-profile.html',
				'controller': 'ProfileController'
			}
		}
	});
}]);
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

var ball = angular.module('Ball', [
	'Ball.controllers',
	'Quote.services'

]);
var services = angular.module('Quote.services', [])

.factory('QuoteService', ['$q',function($q){
	return {
		
		

		quotes:[

				"It is certain",
				"It is decidedly so",
				"Without a doubt",
				"Yes, definitely",
				"You may rely on it",
				"As I see it, yes",
				"Most likely",
				"Outlook good",
				"Yes",
				"Signs point to yes",
				"Reply hazy try again",
				"Ask again later",
				"Better not tell you now",
				"Cannot predict now",
				"Concentrate and ask again",
				"Don't count on it",
				"My reply is no",
				"My sources say no",
				"Outlook not so good",
				"Very doubtful"

		],
     		
    	

		 getQuotes: function(){

		 	return this.quotes;
		 },

		 setQuotes: function(quotes){
		 	this.quotes= quotes;
		 },
		 

		 getRandomQuote: function(){
		 	var quote= this.quotes[ Math.floor(Math.random() * this.quotes.length-1) +1]

		 	return quote;
		 },

		


		 updateQuotes: function(quotes){

		 	console.log("updateQuotes from service");
		 	
		 	var defer= $q.defer();



		 		

		 	// this.setQuotes(quotes);

		 	this.quotes=quotes;
		 	defer.resolve(quotes);

		 	return defer.promise;

		 	
		 }
		


		
		


	};
}]);












































 		// getQuote: function(index){
		 // 	return this.quotes[index];
		 // },

		 // setQuote: function(index, quote){
		 // 	this.quotes[index]= quote;
		 // },



			// for(var x=0; x< quotes.length; x++){
		 // 		if(quotes[x].length < 1){
		 // 			quotes[x] ="EMPTY QUOTE";
		 // 		}
		 // 	}

			// this.quotes= quotes;
		 	// defer.resolve(quotes);

		 	// return defer.promise;

























		
var controller = angular.module('Count.controllers', [])

.controller('FirstCountController', ['$scope', 'CountService', function($scope, CountService){

	$scope.value = 30;

	$scope.changeValue = function(event){
		console.log("button clicked");

		$scope.value = CountService.increment($scope.value, 10);
	}

}])

.controller('SecondCountController', ['$scope', function($scope){

	$scope.value = 100;

	$scope.changeValue = function(event){
		console.log("button clicked");

		$scope.value += 30;
	}

}]);
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
var count = angular.module('Count', [
	'Count.controllers',
	'Count.services',
	'Count.directives'
]);
var services = angular.module('Count.services', [])


.factory('CountService', [function(){
	return {
		increment: function(value, increment){
			var randomNum = Math.random() * 100;

			randomNum += 1000;

			randomNum = randomNum/20;

			return value + randomNum + increment;
		}
	}
}]);
var controllers = angular.module('Dashboard.controllers', [])

.controller('HeaderController', ['$scope', '$state', function($scope, $state){

	$scope.title = capitalizeFirstLetter($state.current.name.replace('dashboard.basic.', ''));

	function capitalizeFirstLetter(string) {
	    return string.charAt(0).toUpperCase() + string.slice(1);
	}
	
}])

.controller('NavController', ['$scope', 'UserService', function($scope, UserService){

	$scope.name = UserService.getUser().firstName + " " + UserService.getUser().lastName;

	$scope.toggleNav = function(){
		$("#wrapper").toggleClass("toggled");
        $(".navbar-toggle").toggleClass("collapsed");
	};

}]);
var dashboard = angular.module('Dashboard', [
	'Dashboard.controllers'
]);
var controllers= angular.module('Profile.controllers', [])

.controller('UserDetailsController' , ['$scope', '$state','UserService', function($scope, $state, UserService){


	
	// $scope.user= UserService.getUser();
	
	$scope.firstName= UserService.getUser().firstName;
	$scope.edit= false;
	$scope.back= false;


	$scope.lastName= UserService.getUser().lastName;
	// $scope.edit= false;
	
	$scope.username= UserService.getUser().username;
	$scope.password= UserService.getUser().password;


	$scope.user= {};
	$scope.saveHandler= function(user){
		

		UserService.save($scope.firstName, $scope.lastName).then(function(){
			// state.go('dashboard.profile');

			         

			// $scope.firstName= "123";
			// $scope.lastName= "123";


		}, function(){
			alert("save failed!");
		});
	};




}]);

// .controller('SaveController', ['$scope', '$state', 'UserService', function($scope, $state, UserService){

// 	$scope.saveHandler= function(){
// 		UserService.save($scope.firstName, $scope.lastName).then(function(){
// 			state.go('dashboard.profile');
// 		}, function(){
// 			alert("save failed!");
// 		});
// 	};

// }]);
var profile= angular.module('Profile', [
	'Profile.controllers',
	'Profile.services'


	]);
var services = angular.module('Profile.services', []);
var controllers = angular.module('Table.controllers', [])
.controller('TableController', ['$scope', 'TableDataService', 'TableChartService', function($scope, TableDataService, TableChartService){

	TableDataService.getGDPTop20().then(function(data){
		TableChartService.refreshCharts('gdpTop20', null);

		$scope.countries = data;
		// console.log(data);




	});

	$scope.setCharts = function(rowData){

		TableChartService.setRowData('gdpTop20', [rowData]);
	}

 
}]);
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
var services = angular.module('Table.services', [])
.factory('TableDataService', ['$q', '$http', function($q, $http){
	return {
		getGDPTop20: function(){
			var defer = $q.defer(), 
				self  = this;

			$http({
				'method': 'GET', 
				'url': 'assets/gdp-data-total-top20.json'
			}).then(function(response){
				self.gdpTop20 = response.data;
				defer.resolve(response.data);
			});

			return defer.promise;
		},

		
	}

}])
.factory('TableChartService', ['TableDataService', function(TableDataService){
	return{
		charts: [],

		
		getWholeData: function(dataName){
			this[dataName] = TableDataService[dataName];
			return TableDataService[dataName];
		},

		refreshCharts: function(dataName, force){
			if(!force){
				this.getWholeData(dataName);

			}
			// if no force: get whole data 
			//force: get only one country of data at a time (current object data after onclick)

			//after onclick: data= one rowData object 
			for(var i = 0; i < this.charts.length; i++){

				if(!angular.element(this.charts[i][0]).scope()){
					continue;
				}

				angular.element(this.charts[i][0]).scope().refresh(dataName);
			}
		},
		

		employChart: function(chart){
			this.charts.push(chart);
		},
		 

		setRowData: function(dataName, rowData){
			this[dataName] = rowData;
			 // console.log(rowData);

			this.refreshCharts(dataName, true); 

		}, 

		pieConfig: function(dataName, service){
			

			
			var data   	   = service[dataName],
				series 	   = [];

			// console.log(data);

			

			//loop through properties of an object
			for(var d in data){
				var entry = data[d];
				
				var seriesObj= {
					name: entry["Country Name"],
					data: []
				} 

				series.push(seriesObj);
				// console.log(entry); 16 objects
				// console.log(series);	
			} 

			//build year
			for(var p in data[0]){
				var value = data[0][p];

				if(typeof value == 'number'){
					var year= p.substring(0, 4);
					// console.log(year); 

					for(var c= 0; c<series.length; c++){
						var countryGDP = entry[year + " " + "[YR" + year + "]"];
						// console.log(countryGDP); 
						seriesObj.data.push(countryGDP);
					}
				}
			}



 			

  
			// //loop through properties of an object
			// for(var d in data){
			// 	var entry = data[d]; 
				
			// 	// console.log(entry); 16 objects
			// 	// console.log(series);
				
			// 	series.push({
			// 		name: entry["Country Name"],
			// 		data: [
						
			// 			entry["2010 [YR2010]"], 
			// 			entry["2011 [YR2011]"],
			// 			entry["2012 [YR2012]"],
			// 			entry["2013 [YR2013]"],
			// 			entry["2014 [YR2014]"] 
			// 		]
			// 	})
			// } 

			return { 
				options: {
		            dataLabels: {
		                enabled: false,
		            }, 
			      	chart: {
		        		type: 'pie'
			      	},
			      	plotOptions: { 
		                pie: {
		                	allowPointSelect: true,
		                    dataLabels: {
		                        distance: -25, //adjust this value to change label distance
		                    	enabled: false,
		                    	format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                   		 style: {
		                        	color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    	}
		                    }
		                }
		            },
			      	tooltip: { 
			          	style: {
			              padding: 10,
			              fontWeight: 'bold'
			          }
			      	},
			      	exporting: {
					    enabled: false
					},
					credits: false
			  	},
			  	//Series object (optional) - a list of series using normal Highcharts series options.
				series: series,

		
				//Title configuration (optional)
				title: {
				    text: 'Most Recent Years'
				},
				//Boolean to control showing loading status on chart (optional)
				//Could be a string if you want to show specific loading text.
				loading: false,
			  	//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
			  	useHighStocks: false,
			  	//size (optional) if left out the chart will default to size of the div or something sensible.
			  	// size: size 
			};

			// return config;
		},

		barConfig: function(dataName, service, size){

			var data= service[dataName],
				series= [], 
				categories= [];

				// console.log(data); = one array of 16 objects

			//build year= categories = x-axis
			for(var p in data[0]){
				var value = data[0][p];

				if(typeof value == 'number'){
					var year= p.substring(0, 4);
					// console.log(year); 
					categories.push(year);
				}
			}

			//build series
			//iterate through each property of the data
			for(var p in data){
				var entry= data[p];


				// console.log(entry); = 16 objects

				var seriesObj= {
					name: entry["Country Name"],
					data: []
				} 

				//iterate through each property of the entry
				for(var c in entry){
					var value = entry[c];

					if(typeof value == 'number'){
						seriesObj.data.push(value)
					}
				} 
				series.push(seriesObj);
			}

			





			// var data   	   = service[dataName],
			// 	series 	   = [],
			// 	categories = [
					
			// 		'2010',
			// 		'2011',
			// 		'2012',
			// 		'2013',
			// 		'2014'
			// 	];

			// 	//categories: x axis 
			// 	//series: y axis 

			// for(var d in data){
			// 	var entry = data[d];
				
			// 	series.push({
			// 		name: entry["Country Name"],
			// 		data: [
						
			// 			entry["2010 [YR2010]"],
			// 			entry["2011 [YR2011]"],
			// 			entry["2012 [YR2012]"],
			// 			entry["2013 [YR2013]"],
			// 			entry["2014 [YR2014]"]
			// 		]
			// 	})
			// }

			return {
				options: {
			      	chart: {
		        		type: 'column'
			      	},
			      	tooltip: {
			          	style: {
			              padding: 10,
			              fontWeight: 'bold'
			          }
			      	},
			      	exporting: {
					    enabled: false
					},
					credits: false
			  	},
			  	//Series object (optional) - a list of series using normal Highcharts series options.
				series: series,
				//Title configuration (optional)
				title: {
				    text: ''
				},
				//Boolean to control showing loading status on chart (optional)
				//Could be a string if you want to show specific loading text.
				loading: false,
				xAxis: {
					title: {
						text: 'Year'
					},
					categories: categories
				},
				yAxis: {
		            title: {
		                text: 'Trillions ($USD)'
		            },
		            labels: {
	                	formatter: function () {
		                    return this.axis.defaultLabelFormatter.call(this).replace('T', '');
		                }            
		            }
				},
			  	//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
			  	useHighStocks: false,
			  	//size (optional) if left out the chart will default to size of the div or something sensible.
			  	size: size
			}

			
		},

		

	}

}]);   
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
var directives = angular.module('Track.directives', [])

/**
*	directive to wrap the "highcharts-ng" chart
*	this directive adds the "type" functionality, 
*	as well as exposes the refresh functionality
**/
.directive('chartWrapper', ['ChartService', function(ChartService){

	function capitalizeWord(word){
		return word.charAt(0).toUpperCase() + word.substring(1);
	}

	return {
		restrict: 'E',
		template: '<highchart config="chartConfig"></highchart>',
		controller: ['$scope', '$attrs', '$element', function($scope, $attrs, $element){	
			
			$scope.refresh = function(){
				let configFn, typeCapitalized;

				typeCapitalized = capitalizeWord($attrs.type);

				configFn = ChartService['get' + typeCapitalized + 'Config'];

				$scope.chartConfig = configFn.call(ChartService);
			};

			ChartService.employChart($element);

		}]
	};
}]);
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
var services = angular.module('Track.services', [])

/**
* 	methods for operating on charts
* 	as well as storage for chart configs
**/
.factory('ChartService', ['DataService', function(DataService){
	return {
		charts: [],
		refreshCharts: function(dataName){

			this.currentData = DataService[dataName];

			for(var i = 0; i < this.charts.length; i++){

				if(!angular.element(this.charts[i][0]).scope()){
					continue;
				}

				angular.element(this.charts[i][0]).scope().refresh();
			}
		},
		employChart: function(chart){
			this.charts.push(chart);
		},
		getSplineConfig: function(){
			var data 	   = this.currentData,
				categories = [],
				series     = [];



			//Goal: Build categories array of years
			//iterate through first country to grab available years
			for(var p in data[0]){
				var value = data[0][p];

				if(typeof value == 'number'){
					categories.push(p.substring(0, 4));
				}
			}

			//Goal: Build series from each country
			//iterate through countries
			for(var i = 0; i < data.length; i++){
				var country = data[i],
					entry   = {
						name: country["Country Name"],
						data: []
					};

				//iterate through each property of the country
				for(var c in country){
					var value = country[c];

					if(typeof value == 'number'){
						entry.data.push(value)
					}
				}

				series.push(entry);
			}

			return {
		        title: {
		            text: '',
		            x: -20 //center
		        },
		        subtitle: {
		            text: '',
		            x: -20
		        },
		        xAxis: {
		            categories: categories
		        },
		        yAxis: {
		            title: {
		                text: 'Temperature (°C)'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: '°C'
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'middle',
		            borderWidth: 0
		        },
		        series: series
		    }
		},
		getPieConfig: function(){
			var data 	   = this.currentData,
				seriesData = [];

				console.log(data);

			//Goal: build series data for each country and 
			// 	    their GDP for the last year in the entries

			//iterate through coutries
			for(var i = 0; i < data.length; i++){
				var country 	 = data[i],
					countryProps = Object.keys(country),
					lastProperty = countryProps[countryProps.length - 1];

				seriesData.push({
					name: country["Country Name"],
					y: 	country[lastProperty]
				});
			}

			return {
				options:{
		        	chart: {
			            type: 'pie'
			        }
		        },
		        title: {
		            text: ''
		        },
		        tooltip: {
		            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
		                    style: {
		                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
		                    }
		                }
		            }
		        },
		        series: [{
		            name: 'Countries',
		            colorByPoint: true,
		            data: seriesData
		        }]
		    }
		},
		getBarConfig: function(){

			var data 	   = this.currentData,
				categories = [],
				series     = [];

			//Goal: build categories list (countries)
			//iterate through list of countries
			for(var x = 0; x < data.length; x++){
				var entry = data[x];

				categories.push(entry["Country Name"]);
			}

			// console.log(categories);

			//Goal: build series list (out of each possible year)
			//iterate through single country
			//to build series year list
			for(var p in data[0]){
				var value = data[0][p];

				// console.log(value); = 4 objects

				if(typeof value == 'number'){
					var seriesObj = {
						name: p.substring(0, 4),
						data: []
					};

					series.push(seriesObj);
				}
			}

			//Goal: build GDP data points per year
			//iterate through newly created series obj
			for(var i = 0; i < series.length; i++){
				var seriesObj = series[i],
					year 	  = seriesObj.name;

					console.log(year);

					//for every series obj, iterate through the countries
					//and grab their gdp values pertaining to the 
					//year we're are iterating (which equals i)
					for(var c = 0; c < data.length; c++){
						var country    = data[c],
							countryGDP = country[year + " " + "[YR" + year + "]"];

						seriesObj.data.push(countryGDP);
					}
			}

			return {
		        options:{
		        	chart: {
		            	type: 'bar'
		        	}
		        },
		        title: {
		            text: ''
		        },
		        subtitle: {
		            text: ''
		        },
		        xAxis: {
		            categories: categories,
		            title: {
		                text: null
		            }
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '$USD (trillions)',
		                align: 'high'
		            },
		            labels: {
		                overflow: 'justify'
		            }
		        },
		        tooltip: {
		            valueSuffix: ' millions'
		        },
		        plotOptions: {
		            bar: {
		                dataLabels: {
		                    enabled: true
		                }
		            }
		        },
		        legend: {
		            layout: 'vertical',
		            align: 'right',
		            verticalAlign: 'top',
		            x: -40,
		            y: 80,
		            floating: true,
		            borderWidth: 1,
		            backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
		            shadow: true
		        },
		        credits: {
		            enabled: false
		        },
		        series: series
		    };
		}
	}
}])

/**
* 	methods for handling our data sources
**/
.factory('DataService', ['$q', '$http', function($q, $http){
	return {
		getGDPTotal: function(){
			var defer = $q.defer(),
				self  = this;

			$http({
				'method': 'GET',
				'url': 'assets/gdp-data-total.json'
			}).then(function(response){

				self.gdpTotal = response.data;
				defer.resolve();

			});

			return defer.promise;
		}
	}
}]);
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
var tracking = angular.module('Tracking', [
	'Tracking.controllers',
	'Tracking.services',
	'Tracking.directives'
]);
var services = angular.module('Tracking.services', [])

.factory('ChartService', ['$q', '$http', '$rootScope', 'DataService', function($q, $http, $rootScope, DataService){
	return {
		charts: [],
		getData: function(dataType){
			this[dataType] = DataService[dataType];
			return DataService[dataType];
		},
		refreshCharts: function(dataType, force){
			if(!force)this.getData(dataType);
			for(var c in this.charts){
				var chart = this.charts[c];
				if(!angular.element(chart[0]).scope()){
					delete this.charts[c];
					continue;
				}
				angular.element(chart[0]).scope().refresh(dataType);
			}
		},
		employChart: function(chart){
			this.charts.push(chart);
		},
		barConfig: function(dataType, service, size){
			var data   	   = service[dataType],
				config     = {},
				series 	   = [],
				categories = [
					'2006',
					'2007',
					'2008',
					'2009',
					'2010',
					'2011',
					'2012',
					'2013',
					'2014'
				];

			for(var d in data){
				var entry = data[d];
				
				series.push({
					name: entry["Country Name"],
					data: [
						entry["2006 [YR2006]"],
						entry["2007 [YR2007]"],
						entry["2008 [YR2008]"],
						entry["2009 [YR2009]"],
						entry["2010 [YR2010]"],
						entry["2011 [YR2011]"],
						entry["2012 [YR2012]"],
						entry["2013 [YR2013]"],
						entry["2014 [YR2014]"]
					]
				})
			}

			config = {
				options: {
			      	chart: {
		        		type: 'column'
			      	},
			      	tooltip: {
			          	style: {
			              padding: 10,
			              fontWeight: 'bold'
			          }
			      	},
			      	exporting: {
					    enabled: false
					},
					credits: false
			  	},
			  	//Series object (optional) - a list of series using normal Highcharts series options.
				series: series,
				//Title configuration (optional)
				title: {
				    text: ''
				},
				//Boolean to control showing loading status on chart (optional)
				//Could be a string if you want to show specific loading text.
				loading: false,
				xAxis: {
					title: {
						text: 'Year'
					},
					categories: categories
				},
				yAxis: {
		            title: {
		                text: 'Trillions ($USD)'
		            },
		            labels: {
	                	formatter: function () {
		                    return this.axis.defaultLabelFormatter.call(this).replace('T', '');
		                }            
		            }
				},
			  	//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
			  	useHighStocks: false,
			  	//size (optional) if left out the chart will default to size of the div or something sensible.
			  	size: size
			}

			return config;
		},
		pieConfig: function(dataType, service, size){
			var data   	   = service[dataType],
				config     = {},
				series 	   = [{
					data: []
				}];



			for(var d in data){
				var entry = data[d];
				
				series[0].data.push({
					name: entry["Country Name"],
					y: entry["2014 [YR2014]"]
				})
			}

			config = {
				options: {
		            dataLabels: {
		                enabled: false,
		            },
			      	chart: {
		        		type: 'pie'
			      	},
			      	plotOptions: {
		                pie: {
		                	allowPointSelect: true,
		                    dataLabels: {
		                        distance: -25, //adjust this value to change label distance
		                    	enabled: false
		                    }
		                }
		            },
			      	tooltip: {
			          	style: {
			              padding: 10,
			              fontWeight: 'bold'
			          }
			      	},
			      	exporting: {
					    enabled: false
					},
					credits: false
			  	},
			  	//Series object (optional) - a list of series using normal Highcharts series options.
				series: series,
				//Title configuration (optional)
				title: {
				    text: 'Most Recent Years'
				},
				//Boolean to control showing loading status on chart (optional)
				//Could be a string if you want to show specific loading text.
				loading: false,
			  	//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
			  	useHighStocks: false,
			  	//size (optional) if left out the chart will default to size of the div or something sensible.
			  	size: size
			}

			return config;
		},
		splineConfig: function(dataType, service, size, range){
			var data   	   = service[dataType],
				config     = {},
				series 	   = [],
				categories = [],
				seriesData = [];

			for(var x = range[0]; x <= range[1]; x++){
				categories.push(x);
			}

			for(var d in data){
				var entry = data[d],
					seriesData = [];
				
				for(var x = range[0]; x <= range[1]; x++){
					seriesData.push(entry[x + " [YR" + x + "]"]);
				}
				series.push({
					name: entry["Country Name"],
					data: seriesData
				})
			}

			config = {
				options: {
			      	chart: {
		        		type: 'spline'
			      	},
			      	tooltip: {
			          	style: {
			              padding: 10,
			              fontWeight: 'bold'
			          }
			      	},
			      	exporting: {
					    enabled: false
					},
					credits: false
			  	},
			  	//Series object (optional) - a list of series using normal Highcharts series options.
				series: series,
				//Title configuration (optional)
				title: {
				    text: ''
				},
				//Boolean to control showing loading status on chart (optional)
				//Could be a string if you want to show specific loading text.
				loading: false,
				xAxis: {
					title: {
						text: 'Year'
					},
					categories: categories
				},
				yAxis: {
		            title: {
		                text: 'Trillions ($USD)'
		            },
		            labels: {
	                	formatter: function () {
		                    return this.axis.defaultLabelFormatter.call(this).replace('T', '');
		                }            
		            }
				},
			  	//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
			  	useHighStocks: false,
			  	//size (optional) if left out the chart will default to size of the div or something sensible.
			  	size: size
			}

			return config;
		},
		areasplineConfig: function(dataType, service, size){
			var data   	   = service[dataType],
				config     = {},
				series 	   = [],
				categories = [
					'2006',
					'2007',
					'2008',
					'2009',
					'2010',
					'2011',
					'2012',
					'2013',
					'2014'
				];

			for(var d in data){
				var entry = data[d];
				
				series.push({
					name: entry["Country Name"],
					data: [
						entry["2006 [YR2006]"],
						entry["2007 [YR2007]"],
						entry["2008 [YR2008]"],
						entry["2009 [YR2009]"],
						entry["2010 [YR2010]"],
						entry["2011 [YR2011]"],
						entry["2012 [YR2012]"],
						entry["2013 [YR2013]"],
						entry["2014 [YR2014]"]
					]
				})
			}

			config = {
				options: {
			      	chart: {
		        		type: 'areaspline'
			      	},
			      	tooltip: {
			          	style: {
			              padding: 10,
			              fontWeight: 'bold'
			          }
			      	},
			      	exporting: {
					    enabled: false
					},
					credits: false
			  	},
			  	//Series object (optional) - a list of series using normal Highcharts series options.
				series: series,
				//Title configuration (optional)
				title: {
				    text: ''
				},
				//Boolean to control showing loading status on chart (optional)
				//Could be a string if you want to show specific loading text.
				loading: false,
				xAxis: {
					title: {
						text: 'Year'
					},
					categories: categories
				},
				yAxis: {
		            title: {
		                text: 'Trillions ($USD)'
		            },
		            labels: {
	                	formatter: function () {
		                    return this.axis.defaultLabelFormatter.call(this).replace('T', '');
		                }            
		            }
				},
			  	//Whether to use Highstocks instead of Highcharts (optional). Defaults to false.
			  	useHighStocks: false,
			  	//size (optional) if left out the chart will default to size of the div or something sensible.
			  	size: size
			}

			return config;
		},
		setCustomData: function(dataType, data){
			this[dataType] = data;

			this.refreshCharts(dataType, true);
		}
	}
}])

.factory('DataService', ['$q', '$http', function($q, $http){
	return {
		formatDollars: function(num, digits){
			var si = [
		 		{ value: 1E18, symbol: "E" },
		    	{ value: 1E15, symbol: "P" },
		    	{ value: 1E12, symbol: "T" },
		    	{ value: 1E9,  symbol: "G" },
		    	{ value: 1E6,  symbol: "M" },
		    	{ value: 1E3,  symbol: "k" }
		  	], i;
		  	
		  	for (i = 0; i < si.length; i++) {
		    	if (num >= si[i].value) {
		      		return (num / si[i].value).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[i].symbol;
		    	}
		  	}

		 	return num.toString();
		},
		getGDPTotal: function(){
			var defer = $q.defer(),
				self  = this;

			$http({
				'method': 'GET',
				'url': 'assets/gdp-data-total.json'
			}).then(function(response){
				self.gdpTotal = response.data;
				defer.resolve(response.data);
			});

			return defer.promise;
		},
		getGDPGrowth: function(){
			var defer = $q.defer(),
				self  = this;

			$http({
				'method': 'GET',
				'url': 'assets/gdp-data-growth.json'
			}).then(function(response){
				self.gdpGrowth = response.data;
				defer.resolve(response.data);
			});

			return defer.promise;
		},
		getGDPPerCapita: function(){
			var defer = $q.defer(),
				self  = this;

			$http({
				'method': 'GET',
				'url': 'assets/gdp-data-per-capita.json'
			}).then(function(response){
				self.gdpPerCapita = response.data;
				defer.resolve(response.data);
			});

			return defer.promise;
		},
		getGDPTop20: function(){
			var defer = $q.defer(),
				self  = this;

			$http({
				'method': 'GET',
				'url': 'assets/gdp-data-total-top20.json'
			}).then(function(response){
				self.gdpTop20 = response.data;
				defer.resolve(response.data);
			});

			return defer.promise;
		}
	}
}]);
var controllers = angular.module('User.controllers', [])

.controller('LoginController', ['$scope', '$state', 'UserService', function($scope, $state, UserService){

	$scope.loginHandler = function(){

		UserService.login($scope.username, $scope.password).then(function(){
			//login success
			$state.go('dashboard.basic.start');
		}, function(){
			//login failed
			$scope.errorMessage = "FAILED!!!!";
		});

		//go into app, $state.go('start')
		//handle login error
	};

}])

.controller('SignupController',  ['$scope', '$state', 'UserService', function($scope, $state, UserService){

	$scope.signupHandler = function(){
		UserService.signup($scope.firstName, $scope.lastName, $scope.username, $scope.password).then(function(){
			//login success
			$state.go('login');
		}, function(){
			//login failed
			alert("fail.");
		});
	}

}])

.controller('ProfileController', ['$scope', 'UserService', function($scope, UserService){
	$scope.testValue = 100;

	$scope.user = UserService.getUser();
}]);
var user = angular.module('User', [
	'User.controllers',
	'User.services'
]);
var services = angular.module('User.services', [])

.factory('UserService', ['$http', '$q', 'localStorageService', function($http, $q, localStorageService){
	return {
		user: {},
		getUser: function(){
			if(!this.user.token){
				this.user = localStorageService.get('user');
			}
			return this.user;
		},
		setUser: function(user){
			this.user = user;
			localStorageService.set('user', user);
		},
		login: function(username, password){
			var defer = $q.defer(),
				self  = this;

			console.log("Login from UserService");

			//call ajax to login
			$http({
				'method': 'POST',
				'url': 'http://localhost:3000/login',
				'data': {
					'username': username,
					'password': password
				}
			}).then(function(response){

				self.setUser(response.data);

				defer.resolve(response);

			}, function(error){
				
				defer.reject(error);

			});
			
			return defer.promise;
		},
		signup: function(fn, ln, un, pw){
			var defer = $q.defer();

			//call ajax to login
			$http({
				'method': 'POST',
				'url': 'http://localhost:3000/signup',
				'data': {
					'firstName': fn,
					'lastName': ln,
					'username': un,
					'password': pw
				}
			}).then(function(response){

				defer.resolve(response);

			}, function(error){
				
				defer.reject(error);

			});

			return defer.promise;
		},

		// quotes: function(){
			

		// 	//call ajax to login
		// 	$http({
				
		// 		'url': 'http://localhost:3000/quotes',
			
		// 	});

			
		// }


	};
}]);