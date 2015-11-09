var config = require('../../config/config'),
	User = require('mongoose').model('User'),
	passport = require('passport');

exports.render = function(req, res) {
	
	var patient_id = req.patientId;
	var category = req.category;
	
	console.log('username: ' + req.user.username);
	
	if (category == 'observation') {
		
		res.render('patientobservation', {
			title: 'Patient Observations',
			id: patient_id,
			pagetype: 'patientobservation',
			userid: req.user.username,
			alert: '',
			username: req.user.firstName + ' ' + req.user.lastName,
			membersince: req.user.created,
			sessionTimeOut: 'yes',
			sessionTimeOutDuration: config.sessionTimeOutDuration
		});		
		
	} else if (category == 'condition') {
		res.render('patientcondition', {
			title: 'Patient Conditions',
			id: patient_id,
			pagetype: 'patientcondition',
			userid: req.user.username,
			username: req.user.firstName + ' ' + req.user.lastName,
			membersince: req.user.created,
			sessionTimeOut: 'yes',
			sessionTimeOutDuration: config.sessionTimeOutDuration
		});
	}
};



var Patient = require('mongoose').model('Patient');

exports.create = function(req, res, next) {
	var patient = new Patient(req.body);
	
	patient.save(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(patient);
		}
	});
};

exports.read = function(req, res) {
	res.json(req.patient);
};

exports.patientByID = function(req, res, next, id) {
	Patient.findOne({
		id: id
	}, function(err, patient) {
		if (err) {
			return next(err);
		} else {
			req.patient = patient;
			next();
		}
	});
};

exports.update = function(req, res, next) {
	Patient.findByIdAndUpdate(req.patient.id, req.body, function(err, patient) {
		if (err) {
			return next(err);
		} else {
			res.json(patient);
		}
	});
};

exports.delete = function(req, res, next) {
	req.patient.remove(function(err) {
		if (err) {
			return next(err);
		} else {
			res.json(req.patient);
		}
	});
};