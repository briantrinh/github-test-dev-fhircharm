var register = require('../../app/controllers/login.server.controller');
		
module.exports = function(app) {
	
	app.get('/register', register.render);
	
};