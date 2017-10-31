//Definde Methods (CRUD) for Session

Session = require('../models/').Session;


module.exports = {
    //Get a list of all Sessions using model.findAll()
    index(req, res) {
        Session.findAll()
            .then(function (session) {
                res.status(200).json(session);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    //Get an session by the unique ID using model.findById()
    show(req, res) {
        Session.findById(req.params.id)
            .then(function (session) {
                res.status(200).json(session);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    //Create a new session using model.create()
    create(req, res) {
        Session.create(req.body)
            .then(function (newSession) {
                res.status(200).json(newSession);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    //Edit an existing Session details using model.update()
    update(req, res) {
        Session.update(req.body, {
            where: {
                id: req.params.id
            }
        })
            .then(function (updatedRecords) {
                res.status(200).json(updatedRecords);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    //Delete an existing Session by the unique ID using model.destroy()
    delete(req, res) {
        Session.destroy({
            where: {
                id: req.params.id
            }
        })
            .then(function (deletedRecords) {
                res.status(200).json(deletedRecords);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    }
};