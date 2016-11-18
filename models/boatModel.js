var mongoose = require('mongoose');

var boatSchema = mongoose.Schema({

	title: 			{type: String, required: true},
	description: 	{type: String, required: true},
	type: 			{type: String, required: true},
	capacity: 		{type: String, required: true},
	location: 		{type: String, required: true},
	address: 		{type: String, required: true},
	price: 			{type: String, required: true},
	image: 			{type: String, required: true},
	owner: 			{type: mongoose.Schema.ObjectId, ref: "user" }
});

module.exports = mongoose.model('boat', boatSchema);


