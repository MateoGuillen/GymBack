module.exports = (sequelize, Sequelize) => {
  const cuota = sequelize.define("cuota", {
    modalidad: {
      type: Sequelize.STRING
    },
    tipo: {
      type: Sequelize.STRING
    },
    fecha: {
      type: Sequelize.DATE
    },
    monto: {
      type: Sequelize.INTEGER
    },
  });

  return cuota;
};
