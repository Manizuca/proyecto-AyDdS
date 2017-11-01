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
                        res.redirect('/rooms/join/' + uuid);
                    res.redirect('/rooms/' + uuid);
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
                    res.redirect('/rooms/' + req.params.uuid);
                }).catch(err => { next(err); });
            } else {
                next();
            }
    })});

    router.get('/:uuid', (req, res, next) => {
        if (req.isAuthenticated()) {
            check = rooms.checkInRoom(req.params.uuid, req.user.email);
        } else {
            check = rooms.checkInRoom(req.params.uuid, null, req.sessionID);
        }

        check.then(alreadyIn => {
            if (alreadyIn) {
                if (req.isAuthenticated()) {
                    promise = rooms.addParticipant(req.params.uuid, req.user.email)
                } else {
                    promise = rooms.addParticipant(req.params.uuid, null, req.sessionID);
                }

                promise.then((exists) => {
                    if (!exists)
                        return next();
                    res.redirect('/rooms/' + req.params.uuid);
                }).catch(err => { next(err); });
            } else {
                next();
            }
    })});

    return router;
}