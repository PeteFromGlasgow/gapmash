var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  db.Property.findAll().then(function (properties) {
    res.render('index', {
      title: 'GAP Analysis',
      properties: properties
    });
  });
});

function createProfile(profile, newProperty) {
	db.Profile.create(profile).then(function(profile){
		console.log()
	    newProperty.addProfile(profile)
  	})
}

function createProperty(property) {

    db.Property.create(property).then(function(newProperty){
  		for (var j = 0; j < property.profiles.length; j++) {

  			var profile = property.profiles[j];
  			createProfile(profile, newProperty);
	  	};
  	});
  	
}

router.get('/properties', function(req, res, next){
	db.Property.findAll().then(function (properties) {
		db.sequelize.query("SELECT PropertyId, COUNT(*) AS c FROM `Profiles` GROUP BY PropertyId").then(function(data){
			var propList = {}
			for (var i = 0; i < properties.length; i++) {
				var property = properties[i];
				propList["prop"+property.id] = property;
			};

			for (var i = 0; i < data.length; i++) {
				console.log(data[i])
				if (propList["prop"+data[i].PropertyId] != null){

					propList["prop"+data[i].PropertyId].profile_count = data[i].c;
				}
				
			};
			res.render('properties', {
		      title: 'GAP Analysis',
		      properties: properties
		    });
		  }).error(function(err){
		  	console.log(err);
		  })
		})
	    
});

router.get('/graph', function(req, res, next){
	db.Property.findAll().then(function (properties) {
	    res.render('graph', {
	      title: 'GAP Analysis',
	      properties: properties
	    });
	  });
});

router.get('/bercomparison', function(req, res, next){
	var outObj = {
		"columns": []
	}
	var berDesign = ["Designed"];
	var berBuilt = ["Built"]
	db.Profile.findAll().then(function (profiles) {
	    
	    var outmap = new Map();
	   	for (var i = 0; i < profiles.length; i++) {
	   		var profile = profiles[i];
	   		if (!outmap.has(profile.PropertyId)){
	   			outmap.set(profile.PropertyId, {propid: profile.PropertyId});
	   		}
	   		var object = outmap.get(profile.PropertyId);
	   		if (profile.event_type == "As designed") {
	   			try {
	   				object.designed = parseFloat(profile.ber);
	   			} catch (e) {

	   			}
	   			
	   		}
	   		if (profile.event_type == "As built"){
	   			try {
	   				object.built = parseFloat(profile.ber);
	   			} catch (e) {

	   			}
	   		}	
	   		outmap.set(profile.PropertyId, object);
	   	};
	   	var allVals = outmap.values();

	    for (var obj of allVals) {
	   		if (obj.built && obj.designed){
	   			berDesign.push(obj.designed);
	   			berBuilt.push(obj.built);
	   		}
	   	};
	   	outObj.columns.push(berDesign);
	   	outObj.columns.push(berBuilt);
	   	res.send(outObj.columns)
	  });
});

router.get('/tercomparison', function(req, res, next){
	var outObj = {
		"columns": []
	}
	var terDesign = ["Designed"];
	var terBuilt = ["Built"]
	db.Profile.findAll().then(function (profiles) {
	    
	    var outmap = new Map();
	   	for (var i = 0; i < profiles.length; i++) {
	   		var profile = profiles[i];
	   		if (!outmap.has(profile.PropertyId)){
	   			outmap.set(profile.PropertyId, {propid: profile.PropertyId});
	   		}
	   		var object = outmap.get(profile.PropertyId);
	   		if (profile.event_type == "As designed") {
	   			try {
	   				object.designed = parseFloat(profile.ter);
	   			} catch (e) {

	   			}
	   			
	   		}
	   		if (profile.event_type == "As built"){
	   			try {
	   				object.built = parseFloat(profile.ter);
	   			} catch (e) {

	   			}
	   		}	
	   		outmap.set(profile.PropertyId, object);
	   	};
	   	var allVals = outmap.values();

	    for (var obj of allVals) {
	   		if (obj.built && obj.designed){
	   			terDesign.push(obj.designed);
	   			terBuilt.push(obj.built);
	   		}
	   	};
	   	outObj.columns.push(terDesign);
	   	outObj.columns.push(terBuilt);
	   	res.send(outObj.columns)
	  });
});

router.get('/loadcomparison', function(req, res, next){
	var outObj = {
		"columns": []
	}
	var loadDesign = ["Designed"];
	var loadBuilt = ["Built"]
	db.Profile.findAll().then(function (profiles) {
	    
	    var outmap = new Map();
	   	for (var i = 0; i < profiles.length; i++) {
	   		var profile = profiles[i];
	   		if (!outmap.has(profile.PropertyId)){
	   			outmap.set(profile.PropertyId, {propid: profile.PropertyId});
	   		}
	   		var object = outmap.get(profile.PropertyId);
	   		if (profile.event_type == "As designed") {
	   			try {
	   				object.designed = parseFloat(profile.annual_heating_load);
	   			} catch (e) {

	   			}
	   			
	   		}
	   		if (profile.event_type == "As built"){
	   			try {
	   				object.built = parseFloat(profile.annual_heating_load);
	   			} catch (e) {

	   			}
	   		}	
	   		outmap.set(profile.PropertyId, object);
	   	};
	   	var allVals = outmap.values();

	    for (var obj of allVals) {
	   		if (obj.built && obj.designed){
	   			loadDesign.push(obj.designed);
	   			loadBuilt.push(obj.built);
	   		}
	   	};
	   	outObj.columns.push(loadDesign);
	   	outObj.columns.push(loadBuilt);
	   	res.send(outObj.columns)
	  });
});

router.get('/properties/:id/profiles', function(req, res, next){
	db.Profile.findAll({where: {PropertyId: req.params.id}}).then(function (profiles) {
	    res.render('profiles', {
	      title: 'GAP Analysis',
	      profiles: profiles
	    });
	  });
});

router.get('/load_json', function (req, res, next) {
  var json = require("../../config/building_data_new.json");
  db.Property.destroy({truncate: true});
  db.Profile.destroy({truncate: true}).then( function(){
	for (var i = 0; i < json.length; i++) {
		var property = json[i];
		createProperty(property);
	}
	  	
	  	
  });
	  
  db.Property.findAll().then(function (properties) {
    res.render('index', {
      title: 'Loaded Json',
      properties: properties
    });
  });
});
