var apiRoutes = require('../api');
var mainRoutes = require('./main');
var passportRoutes = require('./passport');
var path = require('path');

module.exports = function (app, passport) {
    app.use('/', mainRoutes);

    passportRoutes(app, passport);

    app.use('/api', apiRoutes);

    // not found handler
    app.use((req, res, next) => {
        res.status(404);
        res.sendFile(path.join(
            __dirname, '..', '..', 'views', '404.html'));
        });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use((err, req, res, next) => {
          res.status(err.status || 500);
            res.json({
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use((err, req, res, next) => {
        var code = err.status || 500;
        res.status(code);
        res.render('500', { code: code, errmsg: err.message, title: "Error " + code });
    });
}
