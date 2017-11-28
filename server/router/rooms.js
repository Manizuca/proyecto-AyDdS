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

        check.then(isParticipant => {
            if (isParticipant) {
                res.render('room', {title: 'Placeholder Title', userEmail: email});
            } else {
                next();
            }
    })});

    router.post('/:uuid/scene/new', (req, res, next) => {
        if (req.isAuthenticated()) {
            /* TODO: Actually, the user must be the moderator */
            check = rooms.checkInRoom(req.params.uuid, req.user.email);
        } else {
            check = rooms.checkInRoom(req.params.uuid, null, req.sessionID);
        }

        check.then(isParticipant => {
            if (isParticipant) {
                rooms.addScene(req.params.uuid, req.body.title, req.body.description)
                    .then(scene => { res.json(scene) } )
                    .catch(err => { next(err); });
            } else {
                next();
            }
    })});

    router.get('/:uuid/scenes', (req, res, next) => {
        if (req.isAuthenticated()) {
            check = rooms.checkInRoom(req.params.uuid, req.user.email);
        } else {
            check = rooms.checkInRoom(req.params.uuid, null, req.sessionID);
        }

        check.then(isParticipant => {
            if (isParticipant) {
                rooms.getScenes(req.params.uuid)
                    .then(scenes => { res.json(scenes) } )
                    .catch(err => { next(err); });
            } else {
                next();
            }
    })});

    router.post('/:uuid/scene/:id/vote', (req, res, next) => {
        if (req.isAuthenticated()) {
            mail = req.user.email;
            sID = null;
        } else {
            mail = null;
            sID = req.sessionID;
        }
        check = rooms.checkInRoom(req.params.uuid, mail, sID);
        check.then(isParticipant => {
            if (isParticipant) {
                rooms.vote(req.params.uuid, req.params.id, req.body, mail, sID)
                    .then(votes => { res.json(votes) } )
                    .catch(err => { next(err); });
            } else {
                next();
            }
    })});

    return router;
}
