var boat = require('./controllers/boatController.js');
var user = require('./controllers/userController.js');
var multiparty = require('connect-multiparty')();
var express = require('express');


module.exports = function(app) {

	app.post('/api/boats', multiparty, boat.create);

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

	app.get('/logout', user.logout);
    app.post('/login', user.login);

    // app.get('/register')
    // http//localhost:3000/register
    app.post('/register', user.register);

	
	app.get('/api/boats', boat.get);

	app.use(express.static("public"));
}