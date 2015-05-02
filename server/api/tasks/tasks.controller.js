/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';
/*
var _ = require('lodash');
//var settingsService = require('../../components/settingsService');
var base = require('../base');

var dataKey = 'tasks';


// Get list of things
exports.tasks = function(req, res) {
  base.things(dataKey, req, res);
};

//New task
exports.newTask = function(req, res) {
  base.newThing(dataKey, req, res);
}

//Get task by ID
exports.task = function(req, res) {
  var entry = settingsService.entry(dataKey, req.params.id);
  if(entry === undefined) {
    res.status(400).send("Invalid entry.");
  } else {
    res.json(entry);
  }
};

//Update task by ID
exports.updateTask = function(req, res) {
  var updatedEntry = settingsService.update(dataKey, req.params.id, req.body);
  if(updatedEntry) {
    res.send(updatedEntry);
  } else {
    res.status(400).send("Invalid entry.");
  }
}

//Delete task by ID
exports.deleteTask = function(req, res) {
  var deletedEntry = settingsService.deleteEntry(dataKey, req.params.id);
  if(deletedEntry) {
    res.send(deletedEntry);
  } else {
    res.status(400).send("Invalid entry.");
  }
}
*/
