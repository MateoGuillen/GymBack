module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/signup", users.create);

    // login
    router.post("/login", users.login);
  
    // Retrieve all users
    router.get("/", users.findAll);
  
    app.use("/api/users", router);
  };

  //https://towardsdev.com/jwt-authentication-with-node-js-and-react-dc41ef0e6136
  