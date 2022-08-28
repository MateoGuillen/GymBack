

module.exports = (sequelize, Sequelize) => {
  
  const user = sequelize.define("user", {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });
  
  

  return user;
};
