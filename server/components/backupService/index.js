'use strict';

var exec = require('child_process').exec;

var commitMessage = "Tasks changed.";

/*
  Backs up the task data to a local git repo with every write. git is 
  really efficient about storing many versions of the same data, and it
  protects against me accidentally wiping the db due to bugs.
*/
//TODO If git pash isn't correct, sometimes it will work out of the cwd instead of the data dir.
module.exports.backup = function(dirToBackup) {
  //Commit changes to git backup
  
  var command = 'cd ' + dirToBackup + ' && git init && git add * && git commit -am "' + commitMessage + '"';
  console.log("Backup command: " + command);
  exec(command, function(error, stdout, stderr) {
    if(error !== null) {
      console.log("Error committing backup to git!");
      console.log(error);
      console.log(stdout);
      console.log(stderr);
      //throw "Error committing backup to git!";
    } else {
      console.log(stdout);
    }
  });
}