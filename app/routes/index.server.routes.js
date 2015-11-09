var index = require('../controllers/index.server.controller');
var mongomgr = require('../controllers/mongodb.server.controller');

var fhir = require('fhir-node');
		
module.exports = function(app) {
	app.get('/', index.render);
	
	app.get('/patientupdate', mongomgr.render);
	
	app.get('/patientupdate/json', function(req, res) {
		var patientData = fhir();
		
		patientData.then(function(info){
			console.info('found data');
			
			res.send(info);
		});
		
	});
	
};