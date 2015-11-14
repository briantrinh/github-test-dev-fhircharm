var alert = require('../controllers/alert.server.controller'),
	utils = require('./utils');;
		
module.exports = function(app) {
	
	app.get('/alert', utils.ensureAuthenticated, alert.render);
	
};