var config = require('../../config/config'),
	User = require('mongoose').model('User'),
	Patient = require('mongoose').model('Patient'),
	passport = require('passport');

exports.render = function(req, res, next) {
	
	var patient_id = req.patientId;
	var category = req.category;
	
	console.log('username: ' + req.user.username);
	
	var id = '{"onWatch" : {"' + req.user.username + '" : "checked"}, "id" : "' + patient_id + '"}';
	var query = JSON.parse(id);
	
	Patient.count(query, function(err, c) {
		var onWatch = false;
		
		if (err) {
			return next(err);			
		} else {	
			console.log('c = ' + c);
			if (c == '1') {
				console.log('this is onWatch');
				onWatch = true;
			}
		}
		
		if (category == 'observation') {
		
			res.render('patientobservation', {
				title: 'Patient Observations',
				menugroup: 'Profile',
				id: patient_id,
				pagetype: 'patientobservation',
				userid: req.user.username,
				onWatch: onWatch,
				alert: '',
				username: req.user.firstName + ' ' + req.user.lastName,
				membersince: req.user.created,
				sessionTimeOut: 'yes',
				sessionTimeOutDuration: config.sessionTimeOutDuration
			});		

		} else if (category == 'condition') {
			res.render('patientcondition', {
				title: 'Patient Conditions',
				menugroup: 'Profile',
				id: patient_id,
				pagetype: 'patientcondition',
				userid: req.user.username,
				onWatch: onWatch,
				username: req.user.firstName + ' ' + req.user.lastName,
				membersince: req.user.created,
				sessionTimeOut: 'yes',
				sessionTimeOutDuration: config.sessionTimeOutDuration
			});
		} else if (category == 'prescription') {
			res.render('patientprescription', {
				title: 'Medication Prescription',
				menugroup: 'Medication',
				id: patient_id,
				pagetype: 'patientprescription',
				userid: req.user.username,
				onWatch: onWatch,
				username: req.user.firstName + ' ' + req.user.lastName,
				membersince: req.user.created,
				sessionTimeOut: 'yes',
				sessionTimeOutDuration: config.sessionTimeOutDuration
			});
		} else if (category == 'dispense') {
			res.render('patientdispense', {
				title: 'Medication Dispense',
				menugroup: 'Medication',
				id: patient_id,
				pagetype: 'patientdispense',
				userid: req.user.username,
				onWatch: onWatch,
				username: req.user.firstName + ' ' + req.user.lastName,
				membersince: req.user.created,
				sessionTimeOut: 'yes',
				sessionTimeOutDuration: config.sessionTimeOutDuration
			});
		} else if (category == 'alerts') {
			res.render('patientalerts', {
				title: 'Patient Alerts',
				menugroup: 'Alert',
				id: patient_id,
				pagetype: 'patientalerts',
				userid: req.user.username,
				onWatch: onWatch,
				username: req.user.firstName + ' ' + req.user.lastName,
				membersince: req.user.created,
				sessionTimeOut: 'yes',
				sessionTimeOutDuration: config.sessionTimeOutDuration
			});
		}
	});
	
	
	
};


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
	console.log('read = ' + req.patientId);
	
	Patient.findOne({
		id: req.patientId
	}, function(err, patient) {
		if (err) {
			return next(err);
		} else {
			res.json(patient);
		}
	});
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
