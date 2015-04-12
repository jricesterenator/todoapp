/*global describe */
/*global it */
/*global before */
/*global beforeEach */
/*global after */
/*jshint expr: true*/


//JRTODO test update and passing bad data element

'use strict';

//var fs = require('mock-fs'); 
var should = require('should');
var sinon = require('sinon');
var rewire = require('rewire');
//var mockery = require('mockery');
//var assert = require('assert');

var mocklist = require('../test/mock-entries');

 
//var httpMocks = require('node-mocks-http');
//var request = require('supertest');
//var shmock = require('shmock'); 
  
describe('entry tests', function() {

  var settingsService;
  var mockfs = {
      readFileSync: sinon.stub().returns(JSON.stringify([])),
      writeFileSync: sinon.spy()
  };    

  beforeEach(function() {
    settingsService = rewire('./index'); 
    settingsService.__set__({'fs': mockfs});
  });   

  //Convenience method for setting the given entries in the fs output
  function setEntries(data) {
    mockfs.readFileSync = sinon.stub().returns(JSON.stringify(data));
  } 

  function setEntryMgr(entrymgr) {
      mockfs.writeFileSync = sinon.spy(function(path, data) {
        entrymgr.entries().length = 0;

        var entrylist = JSON.parse(data);
        for(var i = 0; i < entrylist.length; ++i) {
          entrymgr.entries().push(entrylist[i]);
        }
      });

      mockfs.readFileSync = sinon.spy(function(path) {
        return JSON.stringify(entrymgr.entries());
      }); 
  }

  describe("get all entries", function() {

    it('should return empty list when no entries', function() {
      //GIVEN
      setEntries([]);

      //WHEN
      var result = settingsService.entries();

      //THEN
      (result).should.be.empty;
    });

    it('should return all entries when there are entries', function() {

      //GIVEN
      setEntries([
        {
          title: 'entry 1' 
        }, 
        {
          title: 'entry 2' 
        }
      ]);

      //WHEN
      var result = settingsService.entries();

      //THEN
      (result).should.not.be.empty;
      (result.length).should.equal(2);
      (result[0].title).should.equal('entry 1');
      (result[1].title).should.equal('entry 2');
    }); 

  }); 

  describe("add entry", function() {
  
    it('should write new entries', function() { 
      //GIVEN   
      setEntries([]);
  
      //WHEN
      settingsService.addEntry({
        'title': 'entry1'
      });
 
      //THEN 
      (mockfs.writeFileSync.calledOnce).should.be.true;
 
      var call = mockfs.writeFileSync.getCall(0);
      (call.args[0]).should.equal('/tmp/store.json');
      (call.args[1]).should.equal(JSON.stringify([{'title':'entry1'}]));
    });

    it('should add entries to existing list', function() {

      //GIVEN 
      var entrymgr = new mocklist(); 
      entrymgr.addEntry({
        'title': 'entry1' 
      });
      entrymgr.addEntry({
        'title': 'entry2'
      });
      setEntryMgr(entrymgr);

      //PRE-ASSERT
      (entrymgr.entries().length).should.equal(2);

      //WHEN
      settingsService.addEntry({
        'title': 'entry3'
      });

      //THEN
      (entrymgr.entries().length).should.equal(3);

    });
  
    it('should get entry by id', function() {

      //GIVEN
      var entrymgr = new mocklist();
      entrymgr.addEntry({
        'title': 'entry1'
      });
      entrymgr.addEntry({
        'title': 'entry2'
      });
      setEntryMgr(entrymgr);

      //WHEN
      var entry1 = settingsService.entry(0);
      var entry2 = settingsService.entry(1);

      //THEN
      (entry1.title).should.equal('entry1');
      (entry2.title).should.equal('entry2');

    });

    it('should return undefined when entry does not exist', function() {
       
      //GIVEN
      var entrymgr = new mocklist();
      entrymgr.addEntry({
        'title': 'entry1'
      });
      entrymgr.addEntry({
        'title': 'entry2'
      });
      setEntryMgr(entrymgr);

      //WHEN
      var entry = settingsService.entry(666);

      //THEN
      should(entry).be.undefined;
    });

  });  

  describe("update entry", function() {
    
    it('should update a specific field in an entry by id', function() {
        //GIVEN
        var entrymgr = new mocklist();
        entrymgr.addEntry({
          'title': 'entry1'
        }); 
        entrymgr.addEntry({
          'title': 'entry2'
        }); 
        setEntryMgr(entrymgr); 

        //PRE-VERIFY
        (entrymgr.entry(0).title).should.equal('entry1');
        (entrymgr.entry(1).title).should.equal('entry2');

        //WHEN
        settingsService.update(1, {title: 'new title'});

        //THEN 
        (entrymgr.entry(0).title).should.equal('entry1');
        (entrymgr.entry(1).title).should.equal('new title'); //field is updated
        (entrymgr.entries().length).should.equal(2);

    });
   
    it('should do nothing if no matching entry is found', function() {

      //GIVEN
      var entrymgr = new mocklist();
      entrymgr.addEntry({
        'title': 'entry1'
      }); 
      entrymgr.addEntry({
        'title': 'entry2'
      }); 
      setEntryMgr(entrymgr); 

      //WHEN
      settingsService.update(666, {});

      //THEN
      (entrymgr.entry(0).title).should.equal('entry1');
      (entrymgr.entry(1).title).should.equal('entry2');
      (entrymgr.entries().length).should.equal(2);

      should(entrymgr.entry(666)).equal(undefined);

    });

    it('should replace all data when updating', function() {
        //GIVEN
        var entrymgr = new mocklist();
        entrymgr.addEntry({
          'title': 'entry1'
        }); 
        entrymgr.addEntry({
          'title': 'entry2'
        }); 
        setEntryMgr(entrymgr); 

        //PRE-VERIFY
        (entrymgr.entry(0).title).should.equal('entry1');

        //WHEN
        settingsService.update(0, {otherdata: 'not a title'});

        //THEN
        var entry = entrymgr.entry(0); 
        should(entry.otherdata).equal("not a title");
        should(entry.title).equal(undefined);
    });

  });
});  
