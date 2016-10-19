// Angular setup app with ngRoute dependency and controllers
angular.module("mainApp", ["ngRoute"])
	.controller("mainCtrl", mainController);

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

    main.greeting = "I'M ON A BOAT!";


    main.addBoat = function() {
    	console.log("Adding a boat!");

    	var newBoat = {
    		title: main.title,
    		description: main.description,
    	}

    	main.list.push(newBoat);
    }

    main.list = [
	    {
	    	title: "21ft powerboat",
	    	description: "this is an amazing, fast, super-duper hotrod boat!.",
	    	image: "pull cloudinary images in...",
	    	price: "$150.00",
	    	location: "San Diego, CA - San Diego Bay"
	    }
    ]
}

// Start Second Controller
function secondController () {
	var second = this;
	second.greeting = "second text second text";
}