// dependencies
var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
// reference line 19 (this code is from boiler plate).
var db = require("./models");

// session store will create a mysql connection pool which handles the connection to the database
var sessionStore = new MySQLStore(options);

var options = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || '8080',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_DATA || 'database'
};

var app = express();

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

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
app.set("view engine", "handlebars");

app.engine(
  "handlebars",
  exphbs({
    extname: exphbs,
    defaultLayout: "main",
    layoutsDir: __dirname + 'views/layouts',
    partialsDir: __dirname + 'views/partials'
  })
);

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
