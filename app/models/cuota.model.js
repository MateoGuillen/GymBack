
const { sequelize, Sequelize }= require('../config/sequelize.conf.js')
const customer =require("./customer.model.js")(sequelize, Sequelize)

module.exports = (sequelize, Sequelize) => {
  const cuota = sequelize.define("cuota", {
    modalidad: {
      type: Sequelize.STRING,
      allowNull: false
    },
    tipo: {
      type: Sequelize.STRING,
      allowNull: false
    },
    fecha: {
      type: Sequelize.DATE,
      allowNull: false
    },
    fechaProximoPago: {
      type: Sequelize.DATE
    },
    monto: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  });
  
  cuota.belongsTo(customer,{
    foreignKey: "customerId", // change default foreignkey of node
  }); // foreign in cuota

  return cuota;
};
