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
exports.things = function(dataKey, req, res) {
  var entries = settingsService.entries();

  if(entries.hasOwnProperty(dataKey)) {
    res.json(entries[dataKey]);
  } else {
    res.json([]);
  }
};

//New task
exports.newThing = function(dataKey, req, res) {
  var newEntry = settingsService.addEntry(dataKey, req.body);
  res.send(JSON.stringify(newEntry));
}

//Get task by ID
exports.thing = function(dataKey, req, res) {
  var entry = settingsService.entry(dataKey, req.params.id);
  if(entry === undefined) {
    res.status(400).send("Invalid entry.");
  } else {
    res.json(entry);
  }
};

//Update task by ID
exports.updateThing = function(dataKey, req, res) {
  var updatedEntry = settingsService.update(dataKey, req.params.id, req.body);
  if(updatedEntry) {
    res.send(updatedEntry);
  } else {
    res.status(400).send("Invalid entry.");
  }
}

//Delete task by ID
exports.deleteThing = function(dataKey, req, res) {
  var deletedEntry = settingsService.deleteEntry(dataKey, req.params.id);
  if(deletedEntry && deletedEntry.length) {
    res.send(deletedEntry[0]);
  } else {
    res.status(400).send("Invalid entry.");
  }
}
