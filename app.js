var bodyParser   = require('body-parser');
var express      = require('express');
var favicon      = require('serve-favicon');
var flash        = require('connect-flash');
var socketIO     = require('socket.io');
var logger       = require('morgan');
var models       = require("./server/models");
var mustache     = require('mustache-express');
var passport     = require('passport');
var path         = require('path');
var routes       = require('./server/router');
var session      = require('express-session');
var rooms        = require('./server/rooms');

require('./server/config/passport')(passport, models.User); // pass passport for configuration

var sessionMiddleware = session({
    resave: false,
    saveUninitialized: true,
    secret: 'est4cl4v3muyd1f1c1l3s123' // session secret
});

var io = socketIO();

io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res, next);
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        msg.userId = 1;
        if (socket.request.session.passport) {
            msg.userName = socket.request.session.passport.user;
        } else {
            msg.userName = 'Invitado';
        }
        socket.broadcast.emit('chat message', msg);
    });
    socket.on('timer-add-seconds', (time) => {
        socket.broadcast.emit('timer-add-seconds', time);
    });
    socket.on('timer-start', () => {
        socket.broadcast.emit('timer-start');
    });
    socket.on('timer-reset', (default_cd) => {
        socket.broadcast.emit('timer-reset', default_cd);
    });
    socket.on('timer-stop', () => {
        socket.broadcast.emit('timer-stop');
    });
});

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
app.use(sessionMiddleware);

//CHANGE SESSION STORE FOR PRODUCTION
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static('public'));

//Routes
models.sequelize.sync().then(() => {
    var roomsController = new rooms(models);
    routes(app, passport, roomsController);
});

app.attachSocketIO = (server) => {
    io.attach(server);
}

module.exports = app;
