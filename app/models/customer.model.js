module.exports = (sequelize, Sequelize) => {
  const customer = sequelize.define("customer", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return customer;
};
