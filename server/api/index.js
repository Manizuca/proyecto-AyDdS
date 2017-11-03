var router = require('express').Router(),
decisions = require('./decision'),
scenario = require('./scenario'),
session = require('./session'),
user = require('./user'),
vote = require('./vote');

//Decision APIs 
router.get('/decisions', decisions.index);
router.get('/decision/:id', decisions.show);
router.post('/decisions', decisions.create);
router.put('/decision', decisions.update);
router.delete('/decision/:id', decisions.delete);

//scenario API
router.get('/scenarios', scenario.index);
router.get('/scenario/:id', scenario.show);
router.post('/scenario', scenario.create);
router.put('/scenario', scenario.update);
router.delete('/scenario/:id', scenario.delete);

//Session Api
router.get('/sessions', session.index);
router.get('/session/:id', session.show);
router.post('/session', session.create);
router.put('/session', session.update);
router.delete('/session/:id', session.delete);

//User API
router.get('/users', user.index);
router.get('/user/:id', user.show);
router.post('/user', user.create);
router.put('/user', user.update);
router.delete('/user/:id', user.delete);

//Vote API
router.get('/votes', vote.index);
router.get('/vote/:id', vote.show);
router.post('/vote', vote.create);
router.put('/vote', vote.update);
router.delete('/vote/:id', vote.delete);

module.exports = router;