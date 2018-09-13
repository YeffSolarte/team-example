'use strict';

var express = require('express');
var EmployeeController = require('../controllers/employee');

var api = express.Router();

api.post('/employee', EmployeeController.saveEmployee);
api.get('/employee/:id', EmployeeController.getEmployee);
api.get('/employee/:page?', EmployeeController.getEmployees);
api.put('/employee/:id', EmployeeController.uptdateEmployee);
api.delete('/employee/:id', EmployeeController.deleteEmployee);

module.exports = api;