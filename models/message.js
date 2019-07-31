module.exports = function(sequelize, DataTypes){


// Creates a "Messages" model that matches up with DB
var Messages = sequelize.define("Messages", {
  username: DataTypes.STRING,
  body: DataTypes.TEXT,
  created_at: DataTypes.DATE
});

// Makes the Messages Model available for other files (will also create a table)
return  Messages;
}