'use strict';

var fs = require('fs');
var uuid = require('node-uuid');
var _ = require('lodash');

var propFile = '/tmp/store.json';


//Get a list of all entries
module.exports.entries = function() {
  try {
    var text = fs.readFileSync(propFile);
    return JSON.parse(text);

  } catch (e) {
    if (e.code === 'ENOENT') {
      console.log('File not found!');
      return [];
    } else {
      throw e;
    }
  }
//  if(text === undefined || text === '') { //JRTODO: Test this! ...doesnt work
//   return JSON.parse([]);
//  }
}

//Add a new entry
module.exports.addEntry = function(entry) {
  var newEntry = {
    _id : uuid.v4(),
    data : entry.data
  };

  var entries = this.entries();
  entries.push(newEntry);
  writeData(entries);

  return newEntry;
}

//Get a specific entry by id
module.exports.entry = function(id) {
  var entries = this.entries();
  return _.find(entries, {_id: id});
}

//Update entry
module.exports.update = function(id, data) {
  var entries = this.entries();

  var entry = _.find(entries, {_id: id});
  if(entry) {
    entry.data = data.data; //Only update the data portion, not the id
    writeData(entries);
    return true;
  }
  return false;
}

//Delete entry
module.exports.deleteEntry = function(id) {
  var entries = this.entries();

  var removedElements = _.remove(entries, {_id: id});
  if(!_.isEmpty(removedElements)) {
    writeData(entries);
    return true;
  } else {
    return false;
  }
}

function writeData(entries) {
  fs.writeFileSync(propFile, JSON.stringify(entries));
}


