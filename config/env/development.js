module.exports = {
	// development configuration
	//db: 'mongodb://localhost/charmander',
	db: 'mongodb://charmander:fhir@ds047652.mongolab.com:47652/charmanderdev',
	fhir: 'http://polaris.i3l.gatech.edu:8080/gt-fhir-webapp-ro/base/',
	sessionSecret: 'developmentSessionSecret',
	sessionTimeOutDuration: 300000,
	sessionCookieDuration: 3600000  
}