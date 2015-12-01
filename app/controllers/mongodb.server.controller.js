var config = require('../../config/config'),
	mongodb = require('mongodb'),
	Patient = require('mongoose').model('Patient'),
	fhir = require('fhir-node');


exports.updateOnWatch = function(req, res) {
	
	var id = '{"id" : "' + req.patientId + '"}';
	var query = JSON.parse(id);

	console.log(req.user.username);
	
	if (req.onWatch == 'ifChecked') {
		//u = '{"onWatch_' + req.user.username + '" : "checked"}';
		var u = '{"$addToSet" : {"onWatch" : {"' + req.user.username + '" : "checked"}}}';
		//updateData.onWatch = 'checked'; //JSON.parse('[{' + req.user.username + ' : checked}]');
		//updateData.onWatch = '[{"' +req.user.username + '": "checked"}]';
		
		var updateData = JSON.parse(u);
	
		console.log(updateData);

		Patient.findOneAndUpdate(query, updateData, { upsert: true }, function (err, raw) {
		  if (err) return console.log(err);
		  console.log('The raw response from Mongo was ', raw);
		});
	} else {
		//updateData =  JSON.parse(u);
		//updateData.onWatch = JSON.parse(u);
		
		var u = '{"$pull" : {"onWatch" : { "$in" : [{"' + req.user.username + '" : "checked"}]}}}';
		var updateData = JSON.parse(u);
	
		console.log(updateData);
		
		Patient.findOneAndUpdate(query, updateData, { multi: true }, function (err, raw) {
		  if (err) return console.log(err);
		  console.log('The raw response from Mongo was ', raw);
		});
		
	}
	
	res.send('ok');
};

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
				if(err) console.error(err);
			});


			// bulk insert the new data
			patientsdump.insert(seedData, function(err, result) {
				if(err) console.error(err);
				
				var patients = db.collection('patients');

				// update patient data
				
				patientsdump.find().forEach(function(doc) {

					console.log("patient insert start");
	
					var id = '{"id" : "' + doc.resource.id + '"}';
					var query = JSON.parse(id);
					var o = '{"upsert" : true}';
					var option = JSON.parse(o);
					var onWatchData = '[{"admin" : ""}]';

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

					console.log(query);

					patients.update(query, updateData, option, function (err, result) {
						if(err) {
							//throw err;
							console.error(err);
						}
					});


				});
			});

			console.log("patientsdump insertion done");
			
		});


		res.render('index', {
			result: 'ok',
			data: 'patient data pulling success!'
		});
	});
	
};