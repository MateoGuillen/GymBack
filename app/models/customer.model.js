module.exports = (sequelize, Sequelize) => {
  const customer = sequelize.define("customer", {
    nombre: {
      type: Sequelize.STRING
    },
  });

  return customer;
};
