// express stuff
const express = require("express");

var app = express();

// Listen for a process in environment for a port number, or, just use port 8080.
PORT = process.env.PORT || 8080;

// #This is a better way to serve up static html pages. Serves ALL files in the public directory. Dont have to create a separate route handler for each page.
app.use(express.static("public"));

// These are separate handlers for each page
// app.get('/', function(req, res) {
// 	// #Send a piece of HTML
// 	// res.send("<h2> hey, it worked. </h2>") 
// 	// #Or send a whole file.
// 	res.sendFile(__dirname + "/index.html");
// 	console.log("Well, we got this far...");
// });

// #This lets me know if we have our connection or not
app.listen(PORT, function(err) { 
	if(err) {
		console.log("server error", err);
		process.exit(1);
	};
	console.log("server is up listening to port "+ PORT);
});