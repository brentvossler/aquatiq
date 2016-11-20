angular.module('boatApp')
	.factory('boatFactory', boatFactory);

boatFactory.$inject = ['$http', 'Upload'];

function boatFactory($http, Upload) {

	return {

		createBoat : function(boatData) {

			// return $http.post('/api/boats', boatData)
			console.log("Returning from the factory");

			return Upload.upload({
				url: '/api/boats',
				method: 'POST',
				data: {
					files: boatData.image,
					data : boatData
				}
			})
		},

		getBoat : function(boatData) {
			console.log("boatdata: ", boatData)
			// boatID = boatID ? '/' + boatID : ''
			return $http.get('/api/boats/'+ boatData)
		},		

		getUserBoats : function(boatData) {
			return $http.get('/api/user/boats');
		},
		deleteUserBoats : function(boatData) {
			return $http.post('/api/user/boats', boatData);
		},

	}
}