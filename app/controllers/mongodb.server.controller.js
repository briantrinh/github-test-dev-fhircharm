var config = require('../../config/config');
var mongodb = require('mongodb');
var fhir = require('fhir-node');

exports.render = function(req, res) {
	
	var patientData = fhir();
		
	patientData.then(function(seedData){
		console.info('found data');

		mongodb.MongoClient.connect(config.db, function(err, db) {
  
			if(err) throw err;

			console.log("Connected to Database");
			
			
			var patientsdump = db.collection('patientsdump');

			// remove the existing data
			patientsdump.drop(function (err) {
				if(err) throw err;
			});


			// bulk insert the new data
			patientsdump.insert(seedData, function(err, result) {
				if(err) throw err;
			});


			var patients = db.collection('patients');

			// update patient data
			patientsdump.find().forEach(function(doc) {
				
				var id = '{"id" : "' + doc.resource.id + '"}';
				var query = JSON.parse(id);
				var o = '{"upsert" : true}';
				var option = JSON.parse(o);
					
				var updateData =  JSON.parse(id);
				updateData.name = doc.resource.name;
				updateData.firstName = doc.resource.name[0].given[0];
				updateData.lastName = doc.resource.name[0].family[0];
				updateData.middleName = doc.resource.name[0].given[1];
				updateData.gender = doc.resource.gender;
				updateData.birthDate = doc.resource.birthDate;
				updateData.address = doc.resource.address[0].line[0] + ', ' + 
					doc.resource.address[0].city + ', ' + 
					doc.resource.address[0].state;
				updateData.active = doc.resource.active;
				
				console.info(query);

				patients.update(query, updateData, option, function (err, result) {
					if(err) {
						//throw err;
						console.error(err);
					}
				});


			});

		});


		res.render('index', {
			result: 'ok',
			data: 'patient data pulling success!'
		});
	});
	
};