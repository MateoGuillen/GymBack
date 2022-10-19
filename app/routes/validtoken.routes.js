module.exports = app => {
    const validtoken = require("../controllers/validtoken.controller.js");
  
    var router = require("express").Router();
  
    // Create a new user
    router.get("/", validtoken.verify);

  
    app.use("/api/validtoken", router);
  };

  
  