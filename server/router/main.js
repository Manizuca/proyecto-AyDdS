var router = require('express').Router();
var path = require('path');

router.get('/', function (req, res) {
    res.render('index', {title: 'Placeholder Title'});
});

router.get('/room/default', function (req, res) {
    res.render('room', {title: 'Placeholder Title'});
});

//Return router
module.exports = router;
