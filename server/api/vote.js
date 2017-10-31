//Definde Methods (CRUD) for Vote

Vote = require('../models/').Vote;


module.exports = {
    //Get a list of all Votes using model.findAll()
    index(req, res) {
        Vote.findAll()
            .then(function (vote) {
                res.status(200).json(vote);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    //Get an Vote by the unique ID using model.findById()
    show(req, res) {
        Vote.findById(req.params.id)
            .then(function (vote) {
                res.status(200).json(vote);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    //Create a new Vote using model.create()
    create(req, res) {
        Vote.create(req.body)
            .then(function (newVote) {
                res.status(200).json(newVote);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    //Edit an existing Vote details using model.update()
    update(req, res) {
        Vote.update(req.body, {
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

    //Delete an existing Vote by the unique ID using model.destroy()
    delete(req, res) {
        Vote.destroy({
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