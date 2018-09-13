'use strict';

var express = require('express');
var bodyParser = require('body-parser');

var app = express();


//middleware
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());


//rutas
app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Hola mundo'
    })
});

//exportar
module.exports = app;