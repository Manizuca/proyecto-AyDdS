var router = require('express')();


router.get('/', (req, res) => {
    res.render('index', {title: 'Placeholder Title'});
});

router.get('/room/default', (req, res) => {
    res.render('room', {title: 'Placeholder Title'});
});

router.get('/login', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('login', {title: 'Login', message: req.flash('loginMessage') });
});

router.get('/signup', (req, res) => {
    // render the page and pass in any flash data if it exists
    res.render('signup', {title: 'Signup', message: req.flash('signupMessage') });
});

//Return router
module.exports = router;
