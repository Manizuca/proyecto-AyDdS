//Definde Methods (CRUD) for model

Decision = require('../models/').Decision;


module.exports= {
    //Get a list of all decisions using model.findAll()
    index(req, res) {
      Decision.findAll()
        .then(function (decisions) {
          res.status(200).json(decisions);
        })
        .catch(function (error) {
          res.status(500).json(error);
        });
    },
  
    //Get an Decision by the unique ID using model.findById()
    show(req, res) {
      Decision.findById(req.params.id)
      .then(function (decision) {
        res.status(200).json(decision);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
    },
  
    //Create a new Decision using model.create()
    create(req, res) {
      Decision.create(req.body)
        .then(function (newDecision) {
          res.status(200).json(newDecision);
        })
        .catch(function (error){
          res.status(500).json(error);
        });
    },
  
    //Edit an existing Decision details using model.update()
    update(req, res) {
      Decision.update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(function (updatedRecords) {
        res.status(200).json(updatedRecords);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
    },
  
    //Delete an existing Decision by the unique ID using model.destroy()
    delete(req, res) {
      Decision.destroy({
        where: {
          id: req.params.id
        }
      })
      .then(function (deletedRecords) {
        res.status(200).json(deletedRecords);
      })
      .catch(function (error){
        res.status(500).json(error);
      });
    }
  };