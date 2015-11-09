var alert = require('../controllers/alert.server.controller');
		
module.exports = function(app) {
	
	app.get('/alert', alert.render);
	
};