var lock = require('../../app/controllers/lock.server.controller'),
	passport = require('passport');
		
module.exports = function(app) {
	
	app.get('/lock', lock.render);
	
};