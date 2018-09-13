'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var employee_routes = require('./routes/employee');


//middleware
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


//routes
app.use('/api', employee_routes);

//exportar
module.exports = app;