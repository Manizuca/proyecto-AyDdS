var router = require('express').Router();
var path = require('path');

router.get('/', function (req, res) {
    res.render('index.mustache', {title: 'Placeholder Title'});
});

//Return router
module.exports = router;
