var router = require('express')();


router.get('/', (req, res) => {
    email = null;
    if (req.isAuthenticated())
        email = req.user.email;
    res.render('index', {title: 'Placeholder Title', userEmail: email});
});

router.get('/login', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('login', {title: 'Login', message: req.flash('loginMessage') });
});

router.get('/signup', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('signup', {title: 'Signup', message: req.flash('signupMessage') });
});

router.get('/logout', (req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout();
        res.redirect('/#!?logout');
    } else next();
});

//Return router
module.exports = router;
