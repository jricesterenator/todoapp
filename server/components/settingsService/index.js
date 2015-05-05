'use strict';

var fs = require('fs');
var uuid = require('node-uuid');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var path = require('path');

var backupService = require('../backupService');

var propFile = 'c:\\projects\\todoappdata\\store.json';


//Get a list of all entries
module.exports.entries = function() {
  try {
    var text = fs.readFileSync(propFile);
    return JSON.parse(text);

  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('File not found!');
      return {};
    } else {
      throw e;
    }
  }
//  if(text === undefined || text === '') { //JRTODO: Test this! ...doesnt work
//   return JSON.parse([]);
//  }
}

//Add a new entry
module.exports.addEntry = function(dataKey, entry) {
  var newEntry = {
    _id : uuid.v4(),
    data: entry.data
  };

  var entries = this.entries();
  if(!entries.hasOwnProperty(dataKey)) {
    entries[dataKey] = [];
  }
  entries[dataKey].push(newEntry);
  writeData(entries);

  return newEntry;
}

//Get a specific entry by id
module.exports.entry = function(dataKey, id) {
  var entries = this.entries();
  return _.find(entries[dataKey], {_id: id});
}

//Update entry
module.exports.update = function(dataKey, id, data) {
  var entries = this.entries();

  var entry = _.find(entries[dataKey], {_id: id});
  if(entry) {
    entry.data = data.data; //Only update the data portion, not the id
    writeData(entries);
    return entry;
  }
}

//Delete entry
module.exports.deleteEntry = function(dataKey, id) {
  var entries = this.entries();

  var removedElements = _.remove(entries[dataKey], {_id: id});
  if(!_.isEmpty(removedElements)) {
    writeData(entries);
    return removedElements;
  }
}

function writeData(entries) {

  var thedir = path.dirname(propFile);
  if (fs.existsSync(thedir)===false) {
    mkdirp(thedir, function (err) {
        if (err) console.error(err)
        else console.log('pow!')
    });
  }

  fs.writeFileSync(propFile, JSON.stringify(entries) + '\n');

  console.log("Backing up dir: " + thedir);
  backupService.backup(thedir);
}


