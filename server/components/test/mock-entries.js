
module.exports = function() {

  var entryList = [];  

  this.addEntry = function(entry) {
    entryList.push(entry);
  };

  this.getEntry = function(id) {
    return entryList[id];
  }

  this.entries = function() { 
    return entryList;
  }

  return {
    addEntry: this.addEntry,
    entry: this.getEntry,
    entries: this.entries
  }

};
