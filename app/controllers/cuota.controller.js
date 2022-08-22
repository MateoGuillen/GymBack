//import { startOfToday, addDays, isAfter } from 'date-fns'
var addDays = require('date-fns/addDays')
const db = require("../models");
const cuota = db.cuotas;
const customerDB = db.customers;
const Op = db.Sequelize.Op;
const { sequelize, Sequelize }= require('../config/sequelize.conf.js')




// Create and Save a new cuota
exports.create = (req, res) => {
  // Validate request
  if (!req.body.modalidad || !req.body.tipo || !req.body.fecha || !req.body.monto || !req.body.customerId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
  var fecha = new Date (req.body.fecha)
  var fechaPagar = fecha

  if (req.body.tipo == "Mensual"){
    fechaPagar = addDays(new Date(fecha), 30)
  }else{
    if (req.body.tipo == "Semanal"){
      fechaPagar = addDays(new Date(fecha), 7)
    }else{
      //es Diario
      fechaPagar = addDays(new Date(fecha), 1)
    }
  }
  console.log(fechaPagar)
  //fechaPagar.setDate(fechaPagar.getDate() + 30)

  // Create a cuota
  const cuotaPost = {
    customerId: req.body.customerId,
    modalidad: req.body.modalidad,
    tipo: req.body.tipo,
    fecha: req.body.fecha,
    fechaProximoPago: fechaPagar,
    monto: req.body.monto
  };
  console.log(cuotaPost)

  // Save cuota in the database
  cuota.create(cuotaPost)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the cuota."
      });
    });
};

// Retrieve all cuotas from the database.
exports.findAll = (req, res) => {
  const fecha = req.query.fecha;
  var condition = fecha ? { fecha: { [Op.iLike]: `%${fecha}%` } } : null;
  var includeAtrib = {
    model: customerDB,
    attributes:['nombre']
  }

  cuota.findAll({ where: condition, include: includeAtrib})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cuotas."
      });
    });
};


//https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
exports.findAllByCustomer = (req, res) => {
  const customerId = req.params.customerId;
  var condition ={
                  customerId: customerId
                 }

  cuota.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cuotas."
      });
    });
};


//https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
exports.findAllByCustomerFecha = (req, res) => {
  const customerId = req.params.customerId;
  const fechaHoy = new Date();
  console.log(fechaHoy)


  var condition ={
                  customerId: customerId,
                  fechaProximoPago :{
                    [Op.lte]: fechaHoy
                    //lte <=
                    //gte >=
                    //between a<x<c
                  }
                 }
  var conditionOrder = [ ['fecha', 'DESC'] ];

  cuota.findOne({ where: condition , order : conditionOrder })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cuotas."
      });
    });
};

exports.findAllCuotaToDay = (req, res) => {
  //const customerId = req.params.customerId;
  //const fechaHoy = new Date();
  //console.log(fechaHoy)

  const TODAY_START = new Date().setHours(0, 0, 0, 0);
  const NOW = new Date();
  var totalDia = 0;
  var total = {
    montoTotal : totalDia
  }
  var condition ={
                  createdAt: { 
                    [Op.gt]: TODAY_START,
                    [Op.lt]: NOW
                  },
                 }
  //https://stackoverflow.com/questions/64016068/customize-returned-foreign-key-object-in-tojson-sequelize
  var conditionOrder = [ ['modalidad', 'DESC'] ];
  var includeCol = ['id', 'modalidad','tipo','monto', 'fecha',
                    'fechaProximoPago','customerId','createdAt','updatedAt',
                    [sequelize.col('customer.nombre'), 'nombre']
                  ]
  var includeAtrib = {
    model: customerDB,
    as: 'customer',
    attributes:[]
  }
  
  cuota.findAll({ where: condition , order : conditionOrder, include:includeAtrib, attributes:includeCol})
    .then(data => {
      data.forEach((cuotaElement, index) => {
        totalDia = totalDia + cuotaElement.dataValues.monto
      });
      console.log(totalDia)
      total.montoTotal = totalDia
      data.push(total)
      console.log(data)
      res.send(data);
      
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cuotas."
      });
    });
};

exports.findAlltest = (req, res) => {
  var cuotasVencidas = [];
  customerDB.findAll()
    .then(data => {
      data.forEach((customer , index) => {
       
        var customerId = customer.dataValues.id;
        var nombreCustomer = customer.dataValues.nombre;

        //console.log(fechaHoy)
        var condition ={
                        customerId: customerId
                      }
        var conditionOrder = [ ['fecha', 'DESC'] ];
        //console.log(customer.dataValues.id)

        cuota.findOne({ where: condition , order : conditionOrder })
        .then(data2 => {
          //console.log("index is " + index)
          //console.log("datalenthes" + data.length)
          if(data2 != null)
          {
            //console.log(data2.dataValues)
            data2.dataValues.nombre = nombreCustomer
            cuotasVencidas.push(data2.dataValues)
            
            
          }

          if(index == data.length-1){
            //res.send(cuotasVencidas)
            //console.log("*************----------------")
            //console.log(cuotasVencidas)
            res.send(cuotasVencidas)
          }
          
          //cuotasVencidas.push(data2)
          //console.log(cuotasVencidas)
          //res.send(data);
        })
        .catch(err => {
          /*res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving cuotas."
          });*/
        });



      });
      //console.log("--------------------------------------------------")
      //console.log(cuotasVencidas)
      //res.send(cuotasVencidas);
      //res.send("hello adad")
      
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving customers."
      });
    });
};

exports.findAllByCustomerFecha2 = (req, res) => {
  const customerId = req.params.customerId;
  const fechaHoy = new Date();
  console.log(fechaHoy)


  var condition ={
                  customerId: customerId,
                  fechaProximoPago :{
                    [Op.gt]: fechaHoy
                  }
                 }

  cuota.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cuotas."
      });
    });
};



// Find a single cuota with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  cuota.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving cuota with id=" + id
      });
    });
};

// Update a cuota by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  cuota.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "cuota was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update cuota with id=${id}. Maybe cuota was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating cuota with id=" + id
      });
    });
};

// Delete a cuota with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  cuota.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "cuota was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete cuota with id=${id}. Maybe cuota was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete cuota with id=" + id
      });
    });
};

// Delete all cuotas from the database.
exports.deleteAll = (req, res) => {
  cuota.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} cuotas were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all cuotas."
      });
    });
};

// find all published cuota
exports.findAllPublished = (req, res) => {
  cuota.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cuotas."
      });
    });
};
