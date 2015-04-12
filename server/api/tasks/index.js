'use strict';

var express = require('express');
var controller = require('./tasks.controller');

var router = express.Router();

router.get('/:id', controller.task);

router.get('/', controller.tasks);

router.post('/', controller.newTask);

router.put('/:id', controller.updateTask);

router.delete('/:id', controller.deleteTask);

module.exports = router;