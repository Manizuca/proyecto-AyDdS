//Definde Methods (CRUD) for Scenario

Scenario = require('../models/').Scenario;


module.exports = {
    //Get a list of all Scenarios using model.findAll()
    index(req, res) {
        Scenario.findAll()
            .then(function (scenario) {
                res.status(200).json(scenario);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    //Get an Scenario by the unique ID using model.findById()
    show(req, res) {
        Scenario.findById(req.params.id)
            .then(function (scenario) {
                res.status(200).json(scenario);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    //Create a new Scenario using model.create()
    create(req, res) {
        Scenario.create(req.body)
            .then(function (newScenario) {
                res.status(200).json(newScenario);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    },

    //Edit an existing Scenario details using model.update()
    update(req, res) {
        Scenario.update(req.body, {
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

    //Delete an existing Scenario by the unique ID using model.destroy()
    delete(req, res) {
        Scenario.destroy({
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