module.exports = app => {
  const cuotas = require("../controllers/cuota.controller.js");

  var router = require("express").Router();

  // Create a new cuota
  router.post("/", cuotas.create);

  // Retrieve all cuotas
  router.get("/", cuotas.findAll);

  // Retrieve all published cuotas
  router.get("/published", cuotas.findAllPublished);

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
