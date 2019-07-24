require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var mysql = require('mysql')(session);

// Creating connection to mysql database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'app_db'
});
// Connection is successful
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected');
});

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Passport JS authentication
require('./authentication').init(app);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
