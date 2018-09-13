'use strict';

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;


//conection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test-team-db', { useNewUrlParser: true })
    .then(() => {
        console.log("conection succesful");
        app.listen(port, () => {
            console.log("server http://localhost:3800");
        });

    }).catch(err => console.log(err));
