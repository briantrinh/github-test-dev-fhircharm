var patient = require('../../app/controllers/patientprescription.server.controller');

module.exports = function(app) {
	app.get('/patientprescription/:patientId/:category', patient.render);
	
	app.route('/patient/:patientId')
		.get(patient.read)
		.put(patient.update)
		.delete(patient.delete);
	

	app.param('patientId', function(req, res, next, patientId) {
		req.patientId = patientId;

		next();
	});
	
	app.param('category', function(req, res, next, category) {
		req.category = category;

		next();
	});
};
