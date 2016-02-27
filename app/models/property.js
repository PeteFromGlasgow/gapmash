// Example model


module.exports = function (sequelize, DataTypes) {

  var Property = sequelize.define('Property', {
    programme_name: DataTypes.STRING,
    project_name: DataTypes.STRING,
    property_code: DataTypes.STRING,
    property_type: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        Property.hasMany(models.Profile);
      }
    }
  });

  return Property;
};

