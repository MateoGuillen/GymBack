const jwt = require("jsonwebtoken");
require('dotenv').config()
module.exports = app => {
  const cuotas = require("../controllers/cuota.controller.js");

  var router = require("express").Router();
 
  // a middleware function with no mount path. This code is executed for every request to the router
 /* router.use(function (req, res, next) {
    var token = req.headers.authorization.split(" ")[1];
    var data = {
      login : false
    }
    if (token){
      try {
        var decoded = jwt.verify(token, process.env.PRIVATE_KEY);
        console.log(decoded.username + " esta logueado actualmente")
        next();
      } catch(err) {
        // err
        //console.log("JWT no valido")
        res.send(data);
        next();
      }
    }else{
      //console.log("IR AL LOGIN")
      res.send(data);
    }
    
    
    
  });*/
  
  

  // Create a new cuota
  router.post("/", cuotas.create);

  // Retrieve all cuotas
  router.get("/", cuotas.findAll);

  // Retrieve all cuotas
  router.get("/test", cuotas.findAlltest);

  // Retrieve all cuotas
  router.get("/hoy", cuotas.findAllCuotaToDay);

  // Retrieve all published cuotas
  router.get("/bycustomer/:customerId", cuotas.findAllByCustomer);

  // Retrieve all published cuotas
  router.get("/deudas/:customerId", cuotas.findAllByCustomerFecha);

  // Retrieve all published cuotas
  router.get("/pagados/:customerId", cuotas.findAllByCustomerFecha2);

  // Retrieve a single cuota with id
  router.get("/:id", cuotas.findOne);

  // Update a cuota with id
  router.put("/:id", cuotas.update);

  // Delete a cuota with id
  router.delete("/:id", cuotas.delete);

  // Delete all cuotas
  router.delete("/", cuotas.deleteAll);

  app.use("/api/cuotas", router);
};
