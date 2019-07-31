  var User = sequelize.define("User", {
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  });

  module.exports = User;