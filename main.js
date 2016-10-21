// Angular setup app with ngRoute dependency and controllers
angular.module("mainApp", ["ngRoute"])
	.controller("mainCtrl", mainController)
	.controller("weatherAPI", weatherController);

// Front end router
angular.module('mainApp')
	.config(myRouter);

myRouter.$inject = ['$routeProvider'];

function myRouter($routeProvider) {

	$routeProvider
		.when('/home', {
			templateUrl: '/templates/home.html'
		})
		.when('/marketplace', {
			templateUrl: '/templates/marketplace.html'
		})
		.when('/forbusiness', {
			templateUrl: '/templates/forbusiness.html'
		})
		.otherwise({
  			redirectTo: '/home'
  		})
}

// Start Main Controller
function mainController() {
    var main = this;
    window.main = main;

    main.addBoat = function() {
    	console.log("Adding a boat!");
    	var newBoat = {
    		title: main.title,
    		description: main.description,
    		capacity: main.capacity,
    		price: main.price,
    	}

    	main.list.push(newBoat);
    }

    main.list= [];
}
http://s2.quickmeme.com/img/76/7603e527515c6356f7ff12282fc3e715fe6542c8bf76215a768b4302659022f9.jpg
// Start Second Controller
weatherController.$inject = ['$http'];
// API KEY: 1db076fb994e59375b4ec4176b93391a 

function weatherController($http) {
	var weather = this;
	weather.forecast = {};
	
	weather.getWeather = function() {
		$http.get('http://api.openweathermap.org/data/2.5/weather?zip={80306},{us}&units=imperial&APPID=1db076fb994e59375b4ec4176b93391a').then(
        function(res, status){
            console.log("got it", res.data);
            weather.forecast = {
            	name: res.data.name,
            	skies: res.data.weather[0].main,
            	icon: res.data.weather[0].icon,
            	temp: res.data.main.temp,
            	wind: res.data.wind.speed
            }  
        },
        function(res, status){
            console.log("GET weather failure", status);
        });
	}
	weather.getWeather();
}