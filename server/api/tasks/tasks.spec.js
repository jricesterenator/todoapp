/*global describe */
/*global it */
/*global before */
/*global beforeEach */
/*global after */


'use strict';

var should = require('should');
var sinon = require('sinon');
var rewire = require('rewire');
var mockery = require('mockery');
var assert = require('assert');


var httpMocks = require('node-mocks-http');
var request = require('supertest');
var shmock = require('shmock'); 

 
var routes = require('../../routes');

describe("task operation", function() {
  var tasks;
  var settingsMock;

  beforeEach(function() {
    tasks = [
      {
        title: 'task 1' 
      }, 
      {
        title: 'task 2'
      }   
    ];


    settingsMock = {
      entries: sinon.stub().returns(tasks)   
    }; 

  });

  it('GET /api/tasks should get all tasks from service', function(done) {

    var controller = rewire('./tasks.controller');
    controller.__set__({'settingsService':  settingsMock});


    //GIVEN 
    //mock /api/tasks request
    var request  = httpMocks.createRequest({
        method: 'GET',
        url: '/api/tasks',
        params: {
        }
    });
    //mock response
    var response = httpMocks.createResponse();
 

    //WHEN 
    //api/tasks index is invokes
    controller.tasks(request, response);

    //THEN  
    //Should get all tasks
    var data = JSON.parse(response._getData());
    data.should.have.length(2);
    data[0].title.should.equal('task 1');
    data[1].title.should.equal('task 2');

    done();
  });

  it('GET /api/task/1 should get task 1 from the service', function(done) {

    var controller = rewire('./tasks.controller');
    controller.__set__({'settingsService':  settingsMock});
 
 
    //GIVEN 
    //mock /api/tasks request
    var request  = httpMocks.createRequest({
        method: 'GET',
        url: '/api/task/1',
        params: {
        }
    });
    //mock response
    var response = httpMocks.createResponse();
 

    //WHEN 
    //api/tasks index is invokes
    controller.task(request, response);

    //THEN  
    //Should get all tasks
    var data = JSON.parse(response._getData());
    //(data).should.equal({title: 'task 1'});

    done();
  });
});


/* 
  it('should get tasks', function(done) {
    var mock = shmock();
    var test = request(mock);

    var handler = mock.get('/api/tasks').reply(200, '{"hello":"world"}');

    test.get('/api/tasks')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        console.log(res);
        //res.body.should.have.property('hello', 'world'); 
        done();
    });
    //handler.isDone.should.be.ok;
      handler.done();

  }); 
*/

//Mock the settings service
/*var settingsServiceMock = {};
settingsServiceMock.load = sinon.stub().returns({"tasks": [{"name":"woo"}]});
settingsServiceMock.save = sinon.stub();
settingsServiceMock.doop = sinon.stub();
*/
//var settingsMock = {
//  load: sinon.stub().returns({"tasks": [{"name":"woo"}]}),
//  save: sinon.stub()
//};

/*
describe('GET /api/tasks', function() {
  it('should respond with Hello, World', function(done) {
    var app = require(app);
    request(app)
      .get('/api/tasks')
      .expect(200) 
      .expect('Content-Type', /json/)
      .end(function(err, res) {
         if (err) return done(err);
         res.body.should.have.property('hello', 'world'); 
        done();
      });
  });
});
*/

 /*
describe("POST /api/tasks", function() {
  var tasks;

  before(function() {
    //mockery.enable({ warnOnUnregistered: true });

    //mockery.registerMock('../../components/settingsService', settingsMock);
    //mockery.registerAllowable('./tasks.controller');
    tasks = require("./tasks.controller");

    // mockery.registerMock('fs', settingsMoctruek);

    //if(app === undefined) {
      //app = require('../../app');  
    //}  
    
    //var myfs = require('fs');
    //console.log(myfs.load());

    //taskController.__set__('settingsService', settingsServiceMock);
  });
  after(function() {
    //mockery.deregisterAll();
    //mockery.disable();
  });  



  it('should create a new task', function(done) {
    var req = {
      params: { id: 2 }
    };

    var res = {
      json: sinon.spy()
    }; 
    
    console.log(JSON.stringify(tasks));
    tasks.task(req, res);
    assert(res.json.calledWith({"tasks": [{"name":"woo"}]}));
    done();
  });
});
*/
