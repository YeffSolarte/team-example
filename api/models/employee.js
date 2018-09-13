'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Employee = Schema({
    name : String,
    dob : String,
    country : String,
    user_name : String,
    hire_date : String,
    status : Number,
    job_title : String,
    tip_rate : String
});

module.exports = mongoose.model('Employee', Employee);