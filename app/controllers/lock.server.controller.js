exports.render = function(req, res) {
	if (req.session.lastVisit) {
		console.log(req.session.lastVisit);		
	}
	
	req.session.lastVisit = new Date();
	
	if (!req.user) return res.redirect('/user/signin');
	
	var returnURL = req.query.returnURL;
	
	console.log('returnURL = ' + returnURL);
	
	req.session.returnTo = returnURL;	
	
	console.log('username: ' + req.user.username);
	
	res.render('lockscreen', {
		title: 'Lock Screen',
		result: '',
		data: '',
		username: req.user.firstName + ' ' + req.user.lastName,
		userid: req.user.username,
		sessionTimeOut: 'no'
	})
};