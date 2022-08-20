module.exports = app => {
  const cuotas = require("../controllers/cuota.controller.js");

  var router = require("express").Router();

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
