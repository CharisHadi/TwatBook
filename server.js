// loads environment variables from a .env file into process.env
require("dotenv").config();

// dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

// process.env keys and values defined in our .env file
var options = require('db');
db.connect({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA
});

// config will read the .env file and assign it to process.env
// config will return an Object with a parsed key containing the loaded content or an error key if it failed
var result = dotenv.config()
 
if (result.error) {
  throw result.error
}
console.log(result.parsed);


/*
// info for connecting to mysql database (same as process.env)

var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'test_db'
};

*/

// session store will create a mysql connection pool which handles the connection to the database
var sessionStore = new MySQLStore(options);
 
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

// reference line 19 (this code is from boiler plate).
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// middleware for Passport.js
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
  extended: false
}));

// require Passport.js authentication folder
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
