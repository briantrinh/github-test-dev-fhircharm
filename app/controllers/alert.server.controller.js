var config = require('../../config/config'),
	Patient = require('mongoose').model('Patient');

exports.render = function(req, res) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);		
	}
	
	req.session.lastVisit = new Date();
	
	req.session.returnTo = req.url;	
	
	res.render('alert', {
		title: 'Alert',
		menugroup: 'System',
		pagetype: 'patients',
		userid: req.user.username,
		alert: '',
		username: req.user.firstName + ' ' + req.user.lastName,
		membersince: req.user.created,
		sessionTimeOut: 'yes',
		sessionTimeOutDuration: config.sessionTimeOutDuration
	});	
};

exports.notification = function(req, res) {
	
	if (!req.isAuthenticated()) { return; }

	console.log('username: ' + req.user.username);

	var id = '{"onWatch" : {"' + req.user.username + '" : "checked"}}';
	var query = JSON.parse(id);

	Patient.find(query, function(err, patients) {
		if (err) {
			return next(err);			
		} else {	
			res.json(patients);

		}
	});
};

exports.check = function(req, res) {
	res.send('To be implemented...');
	
};