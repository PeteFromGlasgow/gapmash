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

router.get('/profiles', function(req, res, next){
	db.Property.findAll().then(function (properties) {
	    res.render('properties', {
	      title: 'GAP Analysis',
	      properties: properties
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
