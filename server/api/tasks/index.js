'use strict';

var dataKey = 'tasks';

var express = require('express');
var router = express.Router();

var base = require('../base/base.controller');

router.get('/:id', function(req, res) {
  base.thing(dataKey, req, res);
});

router.get('/', function(req, res) {
  base.things(dataKey, req, res);
});

router.post('/', function(req, res) {
  base.newThing(dataKey, req, res);
});

router.put('/:id', function(req, res) {
  base.updateThing(dataKey, req, res);
});

router.delete('/:id', function(req, res) {
  base.deleteThing(dataKey, req, res);
});

module.exports = router;