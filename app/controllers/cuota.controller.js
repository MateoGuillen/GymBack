const db = require("../models");
const cuota = db.cuotas;
const Op = db.Sequelize.Op;

// Create and Save a new cuota
exports.create = (req, res) => {
  // Validate request
  if (!req.body.modalidad || !req.body.tipo || !req.body.fecha || !req.body.monto) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a cuota
  const cuotaPost = {
    modalidad: req.body.modalidad,
    tipo: req.body.tipo,
    fecha: req.body.fecha,
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
