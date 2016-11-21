angular.module('boatApp', ['ngFileUpload', 'ngRoute'])
	.controller('mainController', mainController);

mainController.$inject = ['boatFactory', '$location'];

function mainController(boatFactory, $location) {
	console.info('Main controller :: loaded');

    var main = this;
	main.boat = {};
	main.newBoat = {};
    main.boatList = [];

    main.createBoat = function() {
        console.log("Trying to add boat!");
    	boatFactory.createBoat(main.newBoat)
    		.then(function(returnData) {

    			main.newBoat = {}; //reset the form
    			//main.getBoat(); // will show boat created
    			main.getUserBoats();
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
                console.log("Return data length: ", returnData.data.length);
    			if(returnData.data.length) {

    				// if array (has length), store in boatList
    				 main.boatList = returnData.data
                     console.log("BoatList: ", main.boatList);
    			}
                else if(returnData.data){
                    main.boatList = [];
                    main.boatList.push(returnData.data);
                }
                else {
                    main.boatList = [];  
                    console.log("BoatList: ", main.boatList);    
                }
    		
			})
	}

    main.getUserBoats = function() {
        console.log("Getting user boats...");
        boatFactory.getUserBoats()
            .then(function(returnData){
                if(returnData.data.length) {

                    console.log("Should have new boat list");
                    // if array (has length), store in boatList
                    main.boatList = returnData.data;

                    console.log("New boat list: ", main.boatList)
                } else {
                    main.boatList = [];
                }

            })
    }

    main.deleteUserBoats = function(boatId) {
        console.log("Boat ID:", boatId)
        boatFactory.deleteUserBoats(boatId)
            .then(function(returnData) {
                console.log("boat deleted", returnData);
                main.getUserBoats();
            })
    }
}
