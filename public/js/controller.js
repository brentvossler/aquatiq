angular.module('boatApp', ['ngFileUpload', 'ngRoute'])
	.controller('mainController', mainController);

mainController.$inject = ['boatFactory', '$location'];

function mainController(boatFactory, $location) {
	var main = this;
	main.boat = {};
	main.newBoat = {};
    main.boatList = [];

    main.createBoat = function() {
        console.log("Trying to add boat!");
    	boatFactory.createBoat(main.newBoat)
    		.then(function(returnData) {

    			main.newBoat = {}; //reset the form
    			main.getBoat(); // will show boat created
    			console.log('Response from server: ', returnData)
    		});
    }

    main.getBoat = function() {

        //var boatId = window.location.search.substring(1).split('=')[1];
        var boatId = window.location.pathname.split('/')[2];
        console.log("RouteParams BoatID: ", boatId);
        if(boatId === undefined) {
            boatId = "";
        }
        
    	boatFactory.getBoat(boatId)
    		.then(function(returnData) {
                console.log("string", returnData);
    			if(returnData.data.length) {
    				// if array (has length), store in boatList
    				main.boatList = returnData.data;
    			}
    			else {
    				//if not, store in main.boat?
    				main.boat = returnData.data;
    			}
			})
	}


main.getBoat(); // get all the boats
// main.getBoat("123123234234"); // get one boat by ID
}
