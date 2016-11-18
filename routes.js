var boat = require('./controllers/boatController.js');
var user = require('./controllers/userController.js');
var multiparty = require('connect-multiparty')();
var express = require('express');
const nodemailer = require('nodemailer');
const config = require('./config.js');


module.exports = function(app) {

	app.all('/dashboard*', user.middlewares.session);
	
	app.get('/', function(req, res) {
		res.sendFile('index.html', {root :'./public'})
	});
	app.get('/dashboard', function(req, res) {
		res.sendFile('dashboard.html', {root :'./public'})
	});
	app.get('/marketplace', function(req, res) {
		res.sendFile('marketplace.html', {root :'./public'})
	});
	app.get('/login', function(req, res) {
		res.sendFile('login.html', {root :'./public'})
	});
	app.get('/details/:boatId', function(req, res){
		res.sendFile('details.html', {root :'./public'})
	})


	app.post('/send', function (req, res, next) {
	 	var transporter = nodemailer.createTransport({
	 		service: 'Gmail',
	 		auth: {
	 			user: 'socalboat@gmail.com',
	 			pass: config.nodemailer_pass
	 		}
	 	});

	 	var mailOptions = {
	 		from: 'Admin @ <socalboat@gmail.com>',
	 		to: req.body.email,
	 		subject: 'Your Reservation Information',
	 		text: 'You have a  new message with the following details ... Name ' + req.body.name+ ' Email: ' + req.body.email + ' Message: ' +req.body.message,
	 		html: "<p>You have a  new message with the following details</p><ul><li>Name:"+req.body.name+"</li><li>Email: "+req.body.email+"</li><li>Message:"+req.body.message+"</li></ul>"
	 	};

	 	transporter.sendMail(mailOptions, function(err, info){
	 		if(err){
	 			console.log(err);
	 			res.send("Error sending mail!", err);
	 		}
	 		else {
	 			console.log("'Message sent" + info.response);
	 			res.redirect("/");
	 		}  
	 	});
	});

	app.get('/logout', user.logout);
    app.post('/login', user.login);

    // app.get('/register')
    // http//localhost:3000/register
    app.post('/register', user.register);

	app.post('/api/boats', multiparty, boat.create);

	app.get('/api/boats', boat.get);
	app.get('/api/boats/:boatId', boat.get);
	

	app.use(express.static("public"));
}