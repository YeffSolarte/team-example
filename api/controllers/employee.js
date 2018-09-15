'use strict';

var mongoosePaginate = require('mongoose-pagination');
var Employee = require('../models/employee');

function home (req, res) {
    res.status(200).send({
        message: 'Hola mundo'
    })
}

function saveEmployee(req, res){
    var params = req.body;
    var employee = new Employee();

    if(params.name &&
        params.dob &&
        params.country &&
        params.user_name &&
        params.hire_date &&
        params.status &&
        params.job_title)  {
            employee.name = params.name;
            employee.dob = params.dob;
            employee.country = params.country;
            employee.user_name = params.user_name;
            employee.hire_date = params.hire_date;
            employee.status = params.status;
            employee.job_title = params.job_title;
            employee.tip_rate = params.tip_rate || null;

            Employee.find({user_name : employee.user_name}).exec((err, employees) => {
                if(err) return res.status(500).send({error : true, message:'Error en la peticion'});
                if(employees && employees.length >= 1) return res.status(400).send({error : true, message:'El Empleado ya existe'});
                else {
                    employee.save((err, userStored) => {
                        if(err) return res.status(500).send({error : true, message:'Error al guardar el empleado'});

                        if(userStored){
                            res.status(200).send({error : false, data : userStored});
                        } else {
                            res.status(404).send({error : true, message:'No se ha registrado el empleado'});
                        }
                    })
                }
            })


    } else {
        res.status(200).send({
            error : true,
            message : 'Envia todos los campos necesarios'
        })
    }
}

function getEmployee(req, res){
    var employeeId = req.params.id;
    Employee.findById(employeeId, (err, employee) => {
        if(err) return res.status(500).send({error : true, message:'Error en la peticion'});
        if(employee){
            res.status(200).send({error : false, data : employee});
        } else {
            res.status(404).send({error : true, message:'El Empleado no existe'});
        }
    })
}

function getEmployees(req, res) {
    Employee.find().sort('_id').exec((err, employees) => {
        if(err) return res.status(500).send({error : true, message:'Error en la peticion'});
        else {
            if(employees){
                res.status(200).send({error : false, data : employees});
            } else {
                res.status(404).send({error : true, message:'No hay Empleados Disponibles'});
            }
        }
    })
}

function uptdateEmployee(req, res){
    var employeeId = req.params.id;
    var update = req.body;

    Employee.findByIdAndUpdate(employeeId, update, {new : true}, (err, userUpdated) => {
        if(err) return res.status(500).send({error : true, message:'Error en la peticion'});
        if(userUpdated){
            res.status(200).send({error : false, data : userUpdated});
        } else {
            res.status(404).send({error : true, message:'No se ha podido actualizar el empleado'});
        }
    })
}

function deleteEmployee(req, res){
    var employeeId = req.params.id;
    Employee.findByIdAndRemove(employeeId, (err, employeeRemoved) => {
        if(err) return res.status(500).send({error : true, message:'Error en la peticion'});
        if(employeeRemoved){
            res.status(200).send({error : false, message : 'Empleado Eliminado'});
        } else {
            res.status(404).send({error : true, message:'No se ha podido borrar el empleado'});
        }
    })

}

module.exports = {
    saveEmployee,
    getEmployee,
    getEmployees,
    uptdateEmployee,
    deleteEmployee
};
