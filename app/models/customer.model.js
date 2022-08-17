
module.exports = (sequelize, Sequelize) => {
  
  const customer = sequelize.define("customer", {
    nombre: {
      type: Sequelize.STRING
    },
  });
  
  //const cuota = --


 // customer.belongsTo(cuota); // foreign in customer

  return customer;
};
