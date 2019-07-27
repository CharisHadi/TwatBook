// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB
var sequelize = require("../config/connection.js");

// Creates a "Messages" model that matches up with DB
var Messages = sequelize.define("messages", {
  username: Sequelize.STRING,
  body: Sequelize.STRING,
  created_at: Sequelize.DATE
});

// Syncs with DB
Messages.sync();

// Makes the Messages Model available for other files (will also create a table)
module.exports = Messages;