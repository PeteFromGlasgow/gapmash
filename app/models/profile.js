// Example model


module.exports = function (sequelize, DataTypes) {

  var Profile = sequelize.define('Profile', {
       gross_internal_area: DataTypes.STRING,
       ber: DataTypes.STRING,
       ter: DataTypes.STRING,
       event_type: DataTypes.STRING,
       occupancy_total: DataTypes.STRING,
       total_volume: DataTypes.STRING,
       annual_heating_load: DataTypes.STRING,
       total_rooms: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // example on how to add relations
        // Profile.hasMany(models.Comments);
      }
    }
  });

  return Profile;
};

