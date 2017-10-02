var bodyParser   = require('body-parser');
var express      = require('express');
var favicon      = require('serve-favicon');
var flash        = require('connect-flash');
var logger       = require('morgan');
var models       = require("./models");
var mustache     = require('mustache-express');
var passport     = require('passport');
var path         = require('path');
var routes       = require('./server/router');
var session      = require('express-session');

require('./server/config/passport')(passport); // pass passport for configuration

var app = express();

//Express
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(logger('dev')); // log every request to the console

app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));
app.set("layout", path.join(__dirname, 'views', 'layout'));
app.engine('mustache', mustache());

// required for passport
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'est4cl4v3muyd1f1c1l3s123' // session secret
}));

//CHANGE SESSION STORE FOR PRODUCTION
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static('public'));

//Routes
models.sequelize.sync().then(function () {
    routes(app, passport);
});

module.exports = app;
