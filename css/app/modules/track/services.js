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

			//Goal: build series list (out of each possible year)
			//iterate through single country
			//to build series year list
			for(var p in data[0]){
				var value = data[0][p];

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