module.exports = function(rooms) {
    var router = require('express').Router();

    router.get('/new', (req, res, next) => {
        rooms.createRoom()
            .then(uuid => {
                if (req.isAuthenticated()) {
                    promise = rooms.addParticipant(uuid, req.user.email);
                } else {
                    promise = rooms.addParticipant(uuid, null, req.sessionID);
                }

                promise.then((added) => {
                    if (!added)
                        res.redirect('/room/join/' + uuid);
                    res.redirect('/room/' + uuid);
                }).catch(err => { next(err); });
            }).catch(err => { next(err); });
    });

    router.get('/join/:uuid', (req, res, next) => {
        if (req.isAuthenticated()) {
            check = rooms.checkInRoom(req.params.uuid, req.user.email);
        } else {
            check = rooms.checkInRoom(req.params.uuid, null, req.sessionID);
        }

        check.then(alreadyIn => {
            if (!alreadyIn) {
                if (req.isAuthenticated()) {
                    promise = rooms.addParticipant(req.params.uuid, req.user.email)
                } else {
                    promise = rooms.addParticipant(req.params.uuid, null, req.sessionID);
                }

                promise.then((exists) => {
                    if (!exists)
                        return next();
                    res.redirect('/room/' + req.params.uuid);
                }).catch(err => { next(err); });
            } else {
                next();
            }
    })});

    router.get('/:uuid', (req, res, next) => {
        email = null;
        if (req.isAuthenticated()) {
            check = rooms.checkInRoom(req.params.uuid, req.user.email);
            email = req.user.email;
        } else {
            check = rooms.checkInRoom(req.params.uuid, null, req.sessionID);
        }

        check.then(alreadyIn => {
            if (alreadyIn) {
                res.render('room', {title: 'Placeholder Title', userEmail: email});
            } else {
                next();
            }
    })});

    return router;
}
