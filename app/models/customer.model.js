

module.exports = (sequelize, Sequelize) => {
  
  const customer = sequelize.define("customer", {
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
  });
  
  

  return customer;
};
