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
				    text: 'Most Recent Year'
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