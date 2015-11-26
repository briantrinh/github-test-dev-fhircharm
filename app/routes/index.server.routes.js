var index = require('../controllers/index.server.controller'),
	mongomgr = require('../controllers/mongodb.server.controller'),
	fhir = require('fhir-node'),
	patients = require('../controllers/patients.server.controller'),
	utils = require('./utils');
		
module.exports = function(app) {
	//app.get('/', index.render);
	app.get('/', utils.ensureAuthenticated, patients.render);
	
	app.get('/patientupdate', mongomgr.render);
	
	app.get('/patientupdate/json', function(req, res) {
		var patientData = fhir();
		
		patientData.then(function(info){
			console.info('found data');
			
			res.send(info);
		});
		
	});
	
};