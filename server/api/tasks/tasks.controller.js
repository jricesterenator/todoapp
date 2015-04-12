/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var settingsService = require('../../components/settingsService');


// Get list of things
exports.tasks = function(req, res) {
  var entries = settingsService.entries();
  res.json(entries);
};

//New task
exports.newTask = function(req, res) {
  var newId = settingsService.addEntry(req.body);
  res.send(JSON.stringify({_id: newId}));
}

//Get task by ID
exports.task = function(req, res) {
  var entry = settingsService.entry(req.params.id);
  if(entry === undefined) {
    res.status(400).send("Invalid entry.");
  } else {
    res.json(entry);
  }
};

//Update task by ID
exports.updateTask = function(req, res) {
  var success = settingsService.update(req.params.id, req.body);
  if(success) {
    res.send("Entry updated.");
  } else {
    res.status(400).send("Invalid entry.");
  }
}

//Delete task by ID
exports.deleteTask = function(req, res) {
  var success = settingsService.deleteEntry(req.params.id);
  if(success) {
    res.send("Entry deleted.");
  } else {
    res.status(400).send("Invalid entry.");
  }
}
