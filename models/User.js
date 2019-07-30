  var User = sequelize.define("Example", {
    userName: DataTypes.STRING,
    password: DataTypes.STRING
  });

  module.exports = User