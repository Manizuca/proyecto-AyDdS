var router = require('express').Router();
var path = require('path');

router.get('/', function (req, res) {
    res.render('login.mustache', {title: 'Placeholder Title'});
});

//Return router
module.exports = router;
