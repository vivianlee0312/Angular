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

























		