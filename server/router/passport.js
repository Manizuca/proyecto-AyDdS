module.exports = function(app, passport) {
    app.post('/login', passport.authenticate('local', {
        successRedirect : '/', // redirect to home page
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash: { type: 'loginMessage', message: 'Invalid username or password.' } // show flash message
    }));

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/', // redirect to home page
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
}
