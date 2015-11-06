exports.render = function(req, res) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);		
	}
	
	req.session.lastVisit = new Date();
	
	res.json('patient');
};

exports.check = function(req, res) {
	res.send('To be implemented...');
	
};