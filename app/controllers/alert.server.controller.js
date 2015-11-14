var config = require('../../config/config');

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

exports.check = function(req, res) {
	res.send('To be implemented...');
	
};