module.exports = function(sequelize, Datatypes){

  
var User = sequelize.define("User", {
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  });

  
  return User;
}